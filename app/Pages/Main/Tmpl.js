/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-27 16:37:14
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

import { Button, NavigationBar, Input, Select } from 'teaset';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class SysConfig extends Component {
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
                <View style={{ backgroundColor: 'white', marginTop: px2dp(128) }}>
                   
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
    cellStyle: {
        width: SCREEN_WIDTH - px2dp(180),
        backgroundColor: '#fff',
        marginTop: px2dp(40),
        marginBottom: px2dp(30),
        height: px2dp(80),
        borderRadius: 10,
        borderColor: "#d1d1d1",
        borderWidth: px2dp(1),
    },
    cellStyleSelected: {
        width: SCREEN_WIDTH - px2dp(180),
        backgroundColor: Color.primary,
        marginTop: px2dp(40),
        marginBottom: px2dp(30),
        height: px2dp(80),
        borderRadius: 10
    },
    cellTextStyle: {
        color: "#ec9235",
        fontSize: FONT_SIZE(14),
        textAlign: 'center',
        lineHeight: px2dp(80),
    },
    cellTextStyleSelected: {
        color: "#fff",
        fontSize: FONT_SIZE(14),
        textAlign: 'center',
        lineHeight: px2dp(80),
    }
});