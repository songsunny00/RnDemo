/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-15 15:16:36 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 13:29:17
 * @Description: 任务界面 
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Tabs } from 'antd-mobile-rn';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { observer, inject } from 'mobx-react/native';
import NavigationBar from '../../Component/NavigationBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderList from '../../Component/OrderList';
import { Actions } from 'react-native-router-flux';

@inject(["userStore"],["orderStore"]) // 注入对应的store
@observer
export default class Order extends Component {

    constructor(props) {
        super(props);
        this.userStore = this.props.userStore;
        this.orderStore = this.props.orderStore;
    }

    componentDidMount() {
        //this.locationStore.getPermisions();
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
        const tabs = [
            { title: '配送中' },
            { title: '已完成' },
        ];
        return (
            <View style={styles.container}>
                <NavigationBar title={this.userStore.userName}
                    leftButton={
                        <Icon size={25} name='magnify' style={styles.icon} onPress={() => Actions.Search()} />
                    }
                    rightButton={
                        <Icon size={25} name='qrcode-scan' style={styles.icon} onPress={() => Actions.QRScan({ headerTitle: '二维码/条码' })} />
                    }
                />
                <View style={{ backgroundColor:Color.white }}>
                    {/* <Tabs tabs={tabs} initialPage={0} 
                    tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:px2dp(5)}}
                    tabBarBackgroundColor={Color.primary} 
                    tabBarActiveTextColor={Color.white}
                    tabBarInactiveTextColor='#e7e7e7'
                    >
                        <View style={{flex:1}}>
                            <OrderList orderStatus='0' tabLabel={"配送中(" + this.orderStore.loadCarNum + ")"} >配送中</OrderList>
                        </View>
                        <View style={{flex:1}}>
                            <OrderList orderStatus='1' tabLabel={"已完成(" + this.orderStore.loadCarNum + ")"} >已完成</OrderList>
                        </View>
                    </Tabs> */}
                    <ScrollableTabView
                        initialPage={0}
                        page={this.props.orderPage}
                        ref={r => this.ScrollableTabView = r}
                        tabBarBackgroundColor={Color.primary}
                        tabBarInactiveTextColor="#e7e7e7"
                        tabBarActiveTextColor="white"
                        tabBarUnderlineStyle={{ backgroundColor: "#e7e7e7", height: px2dp(4) }}
                        onChangeTab={(obj) => {
                            this.orderStore.setOrderStatus(obj.i + '')
                        }
                        }
                        renderTabBar={() => <ScrollableTabBar />}>
                        <OrderList orderStatus='200' tabLabel={"配送中(" + this.orderStore.loadCarNum + ")"} >配送中</OrderList>
                        <OrderList orderStatus='201' tabLabel={"已完成(" + this.orderStore.arrivedNum + ")"} >已送达</OrderList>
                    </ScrollableTabView>

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