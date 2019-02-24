/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-28 13:48:25
 * @Description: 我的二维码 
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
import QRCode from 'react-native-qrcode-svg';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class MyQR extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
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
                <View style={{ marginTop: px2dp(128), }}>
                    <View style={styles.wrap}>
                        <View style={styles.avatarWrap}>
                            <Image
                                source={Images.Avatar}
                                style={styles.avatar}
                            />
                            <Label style={styles.avatarText}>{this.store.userName}</Label>
                        </View>
                        <View style={styles.QRWrap}>
                            <QRCode
                                value={this.store.userId}
                                size={px2dp(500)}
                                logo={Images.Avatar}
                                logoSize={60}
                                color='purple' />
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
        alignItems: 'center',
    },
    wrap: {
        marginTop: px2dp(50),
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: 'white',
    },
    avatarWrap: {
        alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: px2dp(20),
        marginHorizontal: px2dp(40),
    },
    avatar: {
        width: px2dp(100),
        height: px2dp(100),
        borderRadius: px2dp(50),
        backgroundColor: Theme.transparentColor,
    },
    avatarText: {
        fontSize: FONT_SIZE(14),
        marginVertical: px2dp(10),
        marginHorizontal: px2dp(10),
    },
    QRWrap: {
        alignItems: 'center',
        marginVertical: px2dp(20),
        padding: px2dp(20)
    },
    QRLogo: {
        width: px2dp(150),
        height: px2dp(150),
        borderRadius: px2dp(75),
        backgroundColor: Theme.transparentColor,
        position: "absolute",
        bottom: px2dp(540-150) / 2
    }
});