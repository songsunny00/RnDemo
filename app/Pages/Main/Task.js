/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-15 15:16:36 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 13:29:17
 * @Description: 任务界面 
 */


import React, {Component} from'react';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from'react-native-scrollable-tab-view'
import {
    Button,
    NavigationBar,
    Input,
    Drawer,
    Label,
    Overlay
} from 'teaset';
import { observer, inject } from 'mobx-react/native';
import Menu from './Menu';
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
import OrderList from '../../Component/OrderList';         
import { Actions } from 'react-native-router-flux';
import BackTask from '../Login/BackTask';

@inject(["userStore"], ["locationStore"], ["orderStore"]) // 注入对应的store
@observer
export default class Task extends Component {
    
    constructor(props) {
        super(props);
        this.userStore = this.props.userStore;
        this.orderStore = this.props.orderStore;
        this.locationStore = this.props.locationStore; //通过props来导入访问已注入的store
    }

    componentDidMount() {
        this.locationStore.getPermisions(); 
        this.orderStore.getBaseInfo().then(() => {
            this.orderStore.loading = true;
            this.orderStore.queryTransportOrder(0, 1)
                .then(() => {
                    this.orderStore.loading = false;
                }).catch(() => {
                    this.orderStore.loading = false;
                })
        })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <BackTask />
                <NavigationBar title={'任务'}
                    type='ios'
                    style={{ height: px2dp(128), backgroundColor: Color.primary }}
                    statusBarStyle='default'
                    leftView={
                        <Icon size={25} name='menu' style={styles.icon} onPress={() => Actions.drawerOpen()}/>
                    }
                    rightView={
                        <Icon size={25} name='qrcode-scan' style={styles.icon} onPress={() => Actions.QRScan({ headerTitle: '二维码/条码' })} />
                    }
                />
                <View style={{ backgroundColor: 'white', marginTop: px2dp(128) }}>
                    <View style={styles.locationWrap}>
                        <Icon size={20} name='map-marker' style={styles.locationIcon} />
                        <Label style={styles.locationLabel}>{this.locationStore.address}</Label>
                        <TouchableWithoutFeedback onPress={() => this.locationStore.getCurrentPosition()}>
                            <Icon size={20} name='refresh'
                                style={[styles.locationIcon, { position: 'absolute', right: px2dp(10) }]}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollableTabView 
                        initialPage={0}
                        page={this.props.orderPage}
                        ref={r => this.ScrollableTabView = r}
                        tabBarBackgroundColor={Color.primary}
                        tabBarInactiveTextColor="#e7e7e7"
                        tabBarActiveTextColor="white"
                        tabBarUnderlineStyle={{ backgroundColor:"#e7e7e7",height:px2dp(8)}}
                        onChangeTab={(obj) => {
                                this.orderStore.setOrderStatus(obj.i+'')
                            }
                        }
                        renderTabBar={()=><ScrollableTabBar/>}>
                        <OrderList orderStatus='0' tabLabel={"待装车(" + this.orderStore.loadCarNum+")"} >待装车</OrderList>
                        <OrderList orderStatus='1' tabLabel={"配送中(" + this.orderStore.deliveryNum+")"} >配送中</OrderList>
                        <OrderList orderStatus='2' tabLabel={"已完成(" + this.orderStore.arrivedNum+")"} >已送达</OrderList>
                    </ScrollableTabView>
                    
                    { !this.userStore.isVehicleVerify || !this.userStore.isVerify ?
                        <View style={styles.tipsWrap}>
                            <Icon size={20} name='information' style={styles.tipsIcon} />
                            <Label style={styles.tipsLabel}>2分钟内完善必填信息，就能接单赚钱了</Label>
                            <Button
                                title={'立即完善'}
                                style={styles.tipsBtn}
                                titleStyle={{ fontSize: FONT_SIZE(10), color: '#E51C23' }}
                                //*tag1 onPress={() => Actions.PersonalInfo({ headerTitle: '完善个人信息' })}
                            />
                        </View>
                    : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    icon: {
        marginLeft: px2dp(10),
        marginRight: px2dp(10),
        marginVertical: px2dp(10),
        color: '#fff'
    },
    tipsWrap: {
        flexDirection: 'row',
        backgroundColor: '#fffbeb',
        alignItems: 'center',
        height: px2dp(60),
        width: SCREEN_WIDTH,
        //position: 'absolute',
        //bottom: px2dp(160)
    },
    tipsLabel: {
        color: "#c87c61",
    },
    tipsIcon: {
        marginLeft: px2dp(20),
        marginRight: px2dp(10),
        color: '#c87c61'
    },
    tipsBtn: {
        borderColor: '#E51C23',
        marginLeft: px2dp(10)
    },
    locationWrap: {
        flexDirection: 'row',
        //backgroundColor: '#F1F6F8',
        backgroundColor: Color.primary,
        alignItems: 'center',
        //justifyContent: 'center',
        height: px2dp(60),
        width: SCREEN_WIDTH,
        //marginVertical: px2dp(5),
        //position: 'absolute',
        //bottom: px2dp(120)
    },
    locationLabel: {
        //color: "#106CF7",
        color: '#FFF',
    },
    locationIcon: {
        marginLeft: px2dp(20),
        marginRight: px2dp(10),
        //color: '#106CF7'
        color: '#FFF',
    },
    barStyle: {
        //borderColor: '#d1d1d1',
        //borderWidth: px2dp(1),
        height: px2dp(70),
        backgroundColor: Color.primary
    },
    tabTitle: {
        color: '#fff',
        fontSize: FONT_SIZE(14)
    },
    tabActiveTitle: {
        color: '#000',
        fontSize: FONT_SIZE(14)
    },
    btnStyle: {
        //width: SCREEN_WIDTH - px2dp(180),
        height: px2dp(80),
        marginVertical: px2dp(5),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 0,
    }
});