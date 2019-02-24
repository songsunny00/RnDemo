/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-25 17:54:22 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 13:06:20
 * @Description: 订单列表 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Animated
} from 'react-native';
import {
    Button,
    NavigationBar,
    Input,
    Drawer,
    Label,
    Overlay
} from 'teaset';
import NoData from "./NoData";
import Loading from './Loading';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import OrderItem from './OrderItem';
import Modal from './Modal';
import { observer, inject } from 'mobx-react/native';
@inject(["orderStore"], ['locationStore']) // 注入对应的store

@observer
export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.locationStore = this.props.locationStore;
        this.orderStore = this.props.orderStore;
        this.orderStore.orderStatus = this.props.orderStatus;
        
        this.state = {
            modalVisible: false,
            refreshing: false,
            error: false,
            headerFresh: false,
            footerFresh: false,
            hasMore: true,
            loading: false,
            errorInfo: "",
        };
    }
    componentDidMount() {
        
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onTapDepartConfirm() {
        this.setState({
            refreshing: true
        });
        this.orderStore.departConfirm(this.locationStore.longitude, this.locationStore.latitude).then((res) => {
            console.log('发运成功')
            Toast.success('发运成功');
            //发运后刷新数据
            Actions.Task({ orderPage: 1 });
            //this._onRefresh();
            this.setState({ refreshing: false })
        })
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
    _onRefresh() {
        console.log('refresh');
        this.orderStore.pageIndex = 1;
        this.setState({
            refreshing: true
        });
        this.orderStore.queryTransportOrder(this.props.orderStatus, 1).then((data) => {
            this.setState({ 
                refreshing: false,
                error: false,
            })
        }).catch(() => {
            this.setState({
                error: true,
                refreshing: false
            });
        })

    }
    _onEndReached() {
        console.log('onEndReached')
        if (this.orderStore.pageIndex < this.orderStore.totalPage) {
            this.orderStore.pageIndex++
            this.setState({
                footerFresh: true
            });
            this.orderStore.queryTransportOrder(this.props.orderStatus, this.orderStore.pageIndex)
                .then((data) => {
                    this.setState({
                        footerFresh: true,
                        error: false
                    })
                })
                .catch(() => {
                    this.setState({
                        footerFresh: false,
                        error: true
                    })
                })
        } else {
            console.log('已经到底了' + this.orderStore.pageIndex + ':' + this.orderStore.totalPage);
            this.orderStore.hasMore = false;
            this.setState({
                footerFresh: false,
                hasMore: false
            });
        }
    }
    //加载等待的view
    renderLoadingView(size) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color={Color.blue}
                    size={size}
                />
                <Text style={[styles.textStyle, { marginLeft: 7 }]}>数据加载中...</Text>
            </View>
        );
    }
    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.5}//点击时的透明度
                    onPress={() => this._onRefresh()}>
                    <Text style={[styles.textStyle, { color: Color.blue }]}>网络错误, 点击重新加载</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _renderFooter() {
        let footer = null;
        if (this.state.footerFresh && !this.state.error) {
            footer = this.renderLoadingView('small');
        } else if (this.state.error) {
            //请求失败view
            footer = this.renderErrorView();
        } else if (!this.orderStore.hasMore) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textStyle}>已经到底了</Text>
                </View>
            )
        }
        return footer;
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.orderStore.loading ? <Loading /> : null}
                {this.orderStore.orderLists.length == 0 && !this.orderStore.loading ? <NoData /> : null}
                <AnimatedFlatList
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.refreshing}
                    data={this.orderStore.orderLists}
                    renderItem={(item) => this.renderItem(item)}
                    ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
                    keyExtractor={(item) => item.transportNo}
                    onEndReached={() => this._onEndReached()}
                    ListFooterComponent={() => this._renderFooter()}
                    //getItemLayout={(data, index) => ( { length: 40, offset: (40 + 1) * index + 50, index } )}
                    onEndReachedThreshold={0.1} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50
    },
    btnStyle: {
        //width: SCREEN_WIDTH - px2dp(180),
        height: px2dp(80),
        marginVertical: px2dp(5),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 0,
    },
    overlayViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 14,
        color: '#555555'
    }
});