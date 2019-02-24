/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-05 11:31:30
 * @Description: 侧边栏我的资料 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, Label } from 'teaset';
import AnimateNumber from 'react-native-countup';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Income extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        console.log(this.store.serverUrl);
        this.state = {
            //serverUrlList:  Config.serverUrlList
        };
    }

    componentDidMount() {
        //this.store.getConfig();
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
                <View style={{ marginTop: px2dp(128) }}>
                    <View style={styles.header}>
                        <AnimateNumber
                            style={styles.totalNum}
                            value={45789.88}
                            interval={1}
                            countBy={100}
                            formatter={(val) => {
                                return parseFloat(val).toFixed(2)
                            }}
                        />
                        <Label style={styles.totalText}>总金额(元)</Label>
                        <View style={styles.headerRow}>
                            <View style={styles.rowBox}>
                                <Label style={styles.rowText}>昨日收入(元)</Label>
                                <Label style={styles.rowText}>300.00</Label>
                            </View>
                            <View style={styles.rowBox}>
                                <Label style={styles.rowText}>最近一周(元)</Label>
                                <Label style={styles.rowText}>1345.67</Label>
                            </View>
                             <View style={styles.rowBox}>
                                <Label style={styles.rowText}>最近一月(元)</Label>
                                <Label style={styles.rowText}>34567.80</Label>
                            </View>
                        </View>
                    </View>
                    <View style={styles.listWrap}>
                        <View style={styles.listRowWrap}>
                            <View style={styles.listRow}>
                                <Label style={styles.listRowText}>排线1</Label>
                                <Label style={{ color: '#999999',marginVertical: px2dp(10),
                                    fontSize: FONT_SIZE(12), }}>2018.6.29</Label>
                            </View>
                            <View style={styles.listRow}>
                                <Label style={styles.listRowRightText}>+400.00</Label>
                            </View>
                        </View>
                        <View style={styles.listRowWrap}>
                            <View style={styles.listRow}>
                                <Label style={styles.listRowText}>排线1</Label>
                                <Label style={{
                                    color: '#999999', marginVertical: px2dp(2),
                                    fontSize: FONT_SIZE(12),
                                }}>2018.6.29</Label>
                            </View>
                            <View style={styles.listRow}>
                                <Label style={styles.listRowRightText}>+400.00</Label>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F6F8',
    },
    header: {
        marginVertical: px2dp(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    totalNum: {
        fontSize: FONT_SIZE(36), 
        color: '#FF9800',
        marginVertical: px2dp(10),
    },
    totalText: {
        color: '#999999',
        marginVertical: px2dp(10),
        fontSize: FONT_SIZE(10), 
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: px2dp(30),
    },
    rowBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    rowText: {
        fontSize: FONT_SIZE(10), 
        marginVertical: px2dp(10),
    },
    listWrap: {
        marginTop: px2dp(20),
        backgroundColor: '#FFF',
    },
    listRowWrap: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: px2dp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listRow: {
        marginHorizontal: px2dp(20),
        padding: px2dp(5),
        justifyContent: 'center',
    },
    listRowText: {
        marginVertical: px2dp(5),
        fontSize: FONT_SIZE(14),
    },
    listRowRightText: {
        fontSize: FONT_SIZE(22),
        color: '#FF9800',
        marginVertical: px2dp(10)
    },
    
});