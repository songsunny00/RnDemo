/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-15 15:16:36 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-30 18:43:13
 * @Description: 任务界面 
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    FlatList
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {
    Button,
    NavigationBar,
    Input,
    Drawer,
    Label,
    Overlay
} from 'teaset';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import { observer, inject } from 'mobx-react/native';
import NoData from "../../Component/NoData";
import Menu from './Menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderItem from '../../Component/OrderItem';
import SplashScreen from 'react-native-splash-screen';

@inject(["orderStore"],["userStore"]) // 注入对应的store
@observer
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.userStore;
        this.store = this.props.orderStore;
        this.store.searchWord = this.props.searchWord;
        
        if (this.store.searchWord.startsWith("Y")) {
            this.store.searchWordType = "发车单号:";
        } else if (this.store.searchWord.startsWith("T")) {
            this.store.searchWordType = "发车单号:";
        } 
        
        //this.store = this.order.store; //通过props来导入访问已注入的store
    }

    componentDidMount() {
        console.log('componentDidMount')
        SplashScreen.hide();
        this.store.searchOrder(this.userStore.userId);
    }

    onTapSearch() {
    	this.store.searchOrder(this.userStore.userId)
    }

    showOrderDetail(order) {
        Actions.OrderDetail({
            headerTitle: '订单详情',
            order
        });
    }

    renderItem(info) {
        let order = info.item;
        return (
            <OrderItem order={order} key={order.transportNo} showDetail={(order) => this.showOrderDetail(order)} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={'搜索'}
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
                        <Label style={styles.locationIcon}>{this.store.searchWordType}</Label>
                        <Input
                            style={styles.searchInput}
                            value={this.store.searchWord}
                            placeholder='输入搜索运输单号'
                            onChangeText={(text) => {this.store.searchWord = text}}/>
                        <TouchableWithoutFeedback onPress={() => this.onTapSearch()}>
                        <Icon size={20} name='magnify'
                            style={[styles.locationIcon, { position: 'absolute', right: px2dp(10) }]}
                         />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex:1}}>
                    	{this.store.searchLists.length>0?null:<NoData />}
	                    <AnimatedFlatList 
	                    data={this.store.searchLists}
	                    renderItem={(item) => this.renderItem(item)}
	                    ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
	                    keyExtractor = {(item) => item.transportNo}/> 
                    </View>
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
        backgroundColor: '#F0EB17',
        alignItems: 'center',
        height: px2dp(60),
        width: SCREEN_WIDTH,
        //position: 'absolute',
        //bottom: px2dp(160)
    },
    tipsLabel: {
        color: "#E51C23",
    },
    tipsIcon: {
        marginLeft: px2dp(20),
        marginRight: px2dp(10),
        color: '#E51C23'
    },
    tipsBtn: {
        borderColor: '#E51C23',
        marginLeft: px2dp(10)
    },
    locationWrap: {
        flexDirection: 'row',
        backgroundColor: Color.primary,
        alignItems: 'center',
        height: px2dp(60),
        width: SCREEN_WIDTH,
    },
    searchInput: {
        color:'white',
        backgroundColor:Color.primary,
        //alignItems: 'center',
        //justifyContent: 'center',
        height: px2dp(60),
        width: px2dp(450),
        borderColor:Color.primary,
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
        backgroundColor: '#ec9235'
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