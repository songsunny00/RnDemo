/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-04-23 10:39:14 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-09 09:45:50
 * @Description: 基于mobx的数据文件 
 */

import { observable, action } from "mobx";
import localStorage from 'react-native-simple-store';
import Permissions from 'react-native-permissions';
import { versionCompare } from './../Common/Tool';

class UserStore {
    @observable userName = '';
    @observable phone = ''; // 注册变量，使其成为可检测的
    @observable passWord = '';
    @observable userId = '';
    @observable currUrlIndex = 1;
    @observable socketUrl = Config.wesocketList[3].value;
    @observable serverUrl = Config.serverList[3].value;
    @observable enviroment = Config.serverList[3].text;
    @observable isPhotoVerify = false; //照片是否审核
    @observable isVehicleVerify = false; //车辆是否审核
    @observable isVerify = false; //账号是否审核
    @observable workCity = {//工作城市
        cityId: '',
        cityName: '',
        cityNameEn: '',
    }; 
    @observable truckCode = {//车牌颜色
        key: '',
        code: '',
        name: '',
    };
    @observable truckClass = {//车辆类型
        name: '',
        lengths: '',
        showName: '',
    }; 
    @observable token = '';
    @observable carNo = '';

    constructor() {
        // 初始化变量，可以定义默认值
        this.getBasicInfo();
    }
    
    getBasicInfo = () => {
        localStorage.get('baseInfo').then((item) => {
        console.log(item);
        if (item) {
            this.userName = item.name;
            this.phone = item.phone;
            this.userId = item.masterId;
            this.token = item.token;
            this.carNo = item.carNo ? item.carNo : '';
            this.isPhotoVerify = item.isPhotoVerify;
            this.isVehicleVerify = item.isVehicleVerify;
            this.isVerify = item.isVerify;
            this.serverUrl = item.serverUrl ? item.serverUrl : this.serverUrl;
            this.socketUrl = item.socketUrl ? item.socketUrl : this.socketUrl;
            this.enviroment = item.enviroment ? item.enviroment : this.enviroment;
        }});
    }

    getWorkCity = (workCity) => {
        //console.warn(JSON.stringify(workCity));
        this.workCity = workCity;
        //console.warn(this.workCity);
    } 

    getTruckCode = (truckCode) => {
        //console.warn(JSON.stringify(truckCode));
        this.truckCode = truckCode;
        //console.warn(this.truckCode);
    } 

    getTruckClass = (name, length) => {
        //console.warn(JSON.stringify(truckClass));
        this.truckClass.name = name;
        this.truckClass.length = length;
        this.truckClass.showName = name +'/'+length;
        //console.warn(this.truckClass);
    } 

    @action  // 方法推荐用箭头函数的形式
    changeServer = (value,index) => {
        this.currUrlIndex = index;
        this.serverUrl = value;
        this.socketUrl = Config.wesocketList[index].value;
        this.enviroment = Config.serverList[index].text;
        localStorage.get('baseInfo').then((item)=>{
            item = item ? item : {};
            localStorage.save('baseInfo', Object.assign(item, {
                serverUrl: this.serverUrl,
                socketUrl: this.socketUrl,
                enviroment: this.enviroment
            }));
        })
    }

    @action
    login = () => {
        return new Promise((resolve, reject) => {
            const params = {
                phone: this.phone,
                password: getmd5(this.passWord, true)
            }
            console.log(params)
            Api.login(params, this.serverUrl)
                .then((data) => {
                    data['phone'] = this.phone;
                    data['userId'] = data.masterId;  
                    data['serverUrl'] = this.serverUrl;
                    data['socketUrl'] = this.socketUrl;
                    data['enviroment'] = this.enviroment;
                    this.token = data.token;
                    this.userId = data.masterId;

                    //生成百度鹰眼entity
                    let yyParams = {
                        ak: Config.baiduYingyan.ak,
                        service_id: Config.baiduYingyan.serviceId,
                        entity_name: data.carNo,
                        entity_desc: data.name,
                        carNo: data.carNo,
                        phone: this.phone,
                        DeviceName: device.DeviceBrand + "/" + device.DeviceModel,
                        UniqueID: device.UniqueID,
                        platform: device.Platform
                    }
                    
                    Api.yyApi(yyParams, Config.baiduYingyan.url + Config.baiduYingyan.entityAdd)
                        .then((res) => {
                            console.log(res);
                        }).catch((e) => {
                            console.log(e);
                        });
                    
                    localStorage.get('baseInfo').then((item) => {
                        item = item ? item : {};
                        localStorage.save('baseInfo', Object.assign(item, data));
                    })
                        .then(() => this.getBasicInfo())
                        .then(() => resolve(data));
                })
            .catch((e) => {
                reject(e);
            });
        })
    };

    @action
    logout = () => {
        this.passWord = '';
        this.phone = '';
        localStorage.delete('baseInfo');
    }

    @action
    /** 升级接口需要的字段
     * {
            "data": {
                "version":"1.1",
                "filename":"微信.apk",
                "url":"http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk",
                "desc":["更新了一些bug", "修复了一些UI问题"]
            },
            "error":{"code":0}
        }
        "data": {
                "majorVersionNumber": 1,
                "minorVersionNumber": 0,
                "revisionNumber": 0,
                "fileUrl": "group1:M00/00/30/CkQarlti0keAWj_dAdtJlxH05Q8376.apk",
                "fileName": "app-release.apk",
                "upgradeFlag": 0,–强制更新标识 0 否 1 是
                "updateContent": "更新日志…",
                "version": "1.0.0",
                "releaseTime": "2018-03-12 18:24:56",
                "downloadUrl": "http://10.69.10.70/module-api/app/common/downloadApp",
                "androidUrl": "http://183.61.66.131/group1/M00/00/30/CkQarlti0keAWj_dAdtJlxH05Q8376.apk",
                "iosUrl": "https://itunes.apple.com/cn/app/%E5%90%8C%E5%9F%8E%E9%85%8D/id1300013507?mt=8",
                "appType": “store”
            }
     */
    updateApp = (appType ='driver') => {
        return new Promise((resolve, reject) => {
            Api.getMaxAppVersion({ appType }, this.serverUrl)
                .then((data) => {
                    data['appUpgrade'] = versionCompare(data['version'], device.AppVersion) > 0 ? true : false;
                    //data['appUpgrade'] = true;
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                });
        })
    }
}

const userStore = new UserStore(); 
export { userStore };