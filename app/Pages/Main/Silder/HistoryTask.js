/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-26 21:10:04
 * @Description: 侧边栏历史任务
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import OrderList from './../../../Component/OrderList';
import { Button, NavigationBar, SearchInput } from 'teaset';

import { observer, inject } from 'mobx-react/native';

@inject(["orderStore"]) // 注入对应的store
@observer
export default class HistoryTask extends Component {
    constructor(props) {
        super(props);
        this.orderStore = this.props.orderStore;
        this.state = {
            //serverUrlList:  Config.serverUrlList
        };
    }

    componentDidMount() {
        // this.orderStore.loading = true;
        // this.orderStore.queryTransportOrder('2', 1)
        //     .then(() => {
        //         this.orderStore.loading = false;
        //     }).catch(() => {
        //         this.orderStore.loading = false;
        //     })
    }

    showOrderDetail(order) {
        Actions.OrderDetail({ headerTitle: '订单详情', order });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.headerTitle}
                    type='ios'
                    style={{ height: px2dp(128), backgroundColor: Color.primary }}
                    statusBarStyle='default'

                    leftView={
                        <NavigationBar.BackButton title='返回' onPress={() => Actions.pop()} />
                    }
                />
                <View style={{ backgroundColor: 'white', flex:1, marginTop: px2dp(128) }}>
                    <SearchInput
                        style={styles.search}
                        inputStyle={styles.input}
                        iconSize={20}
                        value={this.state.valueCustom}
                        placeholder='输入运输单号,发运单号'
                        placeholderTextColor='#aaa'
                        onChangeText={text => this.setState({ valueCustom: text })}
                    />
                    <OrderList showOrderDetail={(order) => this.showOrderDetail(order)} />
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
    search: {
        width: SCREEN_WIDTH - px2dp(40),
        marginVertical: px2dp(10),
        height: px2dp(80),
        borderRadius: px2dp(40),
    },
});