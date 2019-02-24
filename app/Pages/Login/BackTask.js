import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    AppState,
    DeviceEventEmitter,
    NativeAppEventEmitter,
    Platform,
} from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
import { Geolocation } from 'react-native-baidu-map';
import SplashScreen from 'react-native-splash-screen';
import localStorage from 'react-native-simple-store';
import { observer, inject } from 'mobx-react/native';


let gpslist = [];
@inject(["socketStore"], ["userStore"], ["locationStore"], ["jpushStore"]) // 注入对应的store
@observer
export default class BackTask extends Component {
    constructor(props) {
        super(props);
        this.socketStore = this.props.socketStore;
        this.userStore = this.props.userStore;
        this.locationStore = this.props.locationStore; 
        this.jpushStore = this.props.jpushStore;
        this.state = {
            gps: ''
        };
    }

    componentWillMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.jpushStore.initJPush();
        console.log('后台任务Start');
        this.startTask();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.stopTask();
        this.jpushStore.clearAllNotifications();
    }

    gpsTask() {
        //return;
        //console.log('gpsTask')
        // let data = {
        //     country:'中国',
        //     province:'广东省',
        //     city:'惠州',
        //     district:'惠城区',
        //     street: "合生大桥",
        //     street_number:'',
        //     latitude:23.113539860805037,
        //     longitude:114.41065807999998,
        //     address:'广东省惠州市惠城区合生大桥'

        // }
        console.log('极光推送的registrationId:' + this.jpushStore.registrationId);
        Geolocation.getCurrentPosition()
            .then(data => {
                //判断位置是否有变化,有变化就上传
                if (this.locationStore.latitude != data.latitude 
                   || this.locationStore.longitude != data.longitude) {
                    this.locationStore.latitude = data.latitude;
                    this.locationStore.longitude = data.longitude;
                    this.locationStore.address = data.address;
                    this.locationStore.city = data.city;
                    this.locationStore.district = data.district;
                    if (data.city) {
                        this.nowCityList = this.locationStore.filterCityData(data.city.replace('市', ''));
                    }
                }

                let agentData = data;
                agentData.carNo = this.userStore.carNo;
                agentData.udid = device.UniqueID;
                agentData.version = device.AppVersion;
                agentData.masterId = this.userStore.userId;
                agentData.token = this.userStore.token;
                agentData.timeStamp = formatTime(new Date());
                agentData.platform = device.Platform;
                agentData.osType = device.SystemVersion;
                agentData.creator = device.DeviceBrand + "/" + device.DeviceModel;
                agentData.isFirst = 'N';
                console.log(JSON.stringify(agentData));
                this.socketStore.sendMsg(agentData);
                this.postYyGps(data);
            })
            .catch(e => {
                console.log(e, 'error');
            })

        //localStorage.save('GpsList', gpslist);
    }


    //上传Gps鹰眼
    postYyGps = (params) => {
        let yyParams = {
            ak: Config.baiduYingyan.ak,
            service_id: Config.baiduYingyan.serviceId,
            entity_name: this.userStore.carNo,
            latitude: params.latitude,
            longitude: params.longitude,
            loc_time: Math.round(new Date().getTime() / 1000),
            coord_type_input: 'bd09ll',
            speed: params.speed || 0.0,
            direction: params.direction || 0,
            radius: params.radius || 0.0,
        }

        Api.yyApi(yyParams, Config.baiduYingyan.url + Config.baiduYingyan.trackAddpoint)
            .then((res) => {
                //console.log(res);
            }).catch((e) => {
                console.log(e);
        });
    }

    startTask() {
        if(this.userStore.token) { 
            this.socketStore.startSocket(this.userStore.socketUrl, this.userStore.userId, this.userStore.token)
                .then(() => {
                
                })
                .catch(() => {
                    Actions.reset('loading');
                })
        }
        if (iOS) {
            BackgroundTimer.runBackgroundTimer(() => {
                //code that will be called every 30 seconds 
                if(this.userStore.token) this.gpsTask()
            },30000);
        }
        else {
            this.socketStore.taskId = BackgroundTimer.setInterval(() => {
                // this will be executed every 200 ms
                // even when app is the the background
                if(this.userStore.token) this.gpsTask()
            }, 30000);
        }
    }

    stopTask() {
        if (iOS) {
            BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
        } else {
            BackgroundTimer.clearInterval( this.socketStore.taskId );
        }
    }

    componentDidMount() {
        //SplashScreen.hide();
        //rest of code will be performing for iOS on background too
    }

    handleAppStateChange = (appState) => {
        console.log("当前状态: " + appState);
        if (appState == 'background') {
            console.log('后台开始在跑');
            this.startTask();
            this.jpushStore.initJPush();
        } 
    }

    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

