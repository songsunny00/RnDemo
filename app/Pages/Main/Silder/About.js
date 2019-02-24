/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-07 10:45:04
 * @Description: 关于我们 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, Input, Label } from 'teaset';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class About extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
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
                <View style={{ backgroundColor: 'white', flex: 1, marginTop: px2dp(128) }}>
                    <View style={styles.appiconWrap}>
                        <Image
                            source={Images.AppIcon}
                            style={styles.appicon}
                        />
                        <Label style={styles.version}>{device.AppName}{device.AppVersion}</Label>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={ async ()=> {
                                //console.log('a');
                                //Actions.Task({ orderPage: 2 });
                                // 在这里可以发请求，用promise返回结果
                                let res = await this.store.updateApp();
                                $RNUpdate.checkUpdate(res, true);
                            }}>
                            <Label style={styles.update}>检查更新</Label>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Label>速必达希杰物流有限公司版权所有</Label>
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
    appiconWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(30),
        flex: 1,
    },
    appicon: {
        width: px2dp(170),
        height: px2dp(170),
        borderRadius: px2dp(30),
        backgroundColor: Theme.transparentColor,
    },
    version: {
        borderColor: "#000",
        borderWidth: px2dp(1),
        padding: px2dp(10),
        marginTop: px2dp(50),
        //height: px2dp(30),
        borderRadius: px2dp(10),
    },
    update: {
        fontSize: FONT_SIZE(16), 
        color: '#ec9235',
        marginTop: px2dp(280), 
    },
    bottom: {
        height: px2dp(30),
        alignItems: 'center',
        marginVertical: px2dp(80),
    },  
});