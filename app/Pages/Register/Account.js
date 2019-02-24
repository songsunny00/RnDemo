/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:24:45 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-29 13:33:02
 * @Description: 注册账号 
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import { Button, NavigationBar, Input, Select, Label } from 'teaset';
import LoginInput from './../../Component/LoginInput';
import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Account extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        this.state = {};
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
                <View style={styles.bannerStyle}>
                    <Image
                        source={Images.RegBanner}
                        resizeMode='cover'
                        style={styles.bannerImageStyle}
                    />
                </View>
                <View style={styles.formStyle}>
                    <LoginInput
                        placeholder='手机号'
                        onChangeText={(text) => {

                        }}
                        value={this.store.phone}
                        icon="cellphone-iphone"
                    />
                    <LoginInput
                        placeholder='验证码'
                        onChangeText={(text) => {

                        }}
                        value={this.store.vertifyCode}
                        icon="shield-half-full"
                        isVerify={true}
                        sendSMSCode={() => { console.log("发验证码") }}
                    />
                    <LoginInput
                        placeholder='请输入密码'
                        onChangeText={(text) => {

                        }}
                        value={this.store.vertifyCode}
                        isPassword={true}
                        icon="lock"
                    />
                    <LoginInput
                        placeholder='请确认密码'
                        onChangeText={(text) => {

                        }}
                        value={this.store.vertifyCode}
                        isPassword={true}
                        icon="lock"
                    />
                    <Button title={'去注册'}
                        style={styles.registerButtonStyle}
                        titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                        onPress={() => this.onRegisterPress()}
                    />
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: px2dp(20) }}>
                        <Label style={styles.regLabelStyle}>点击“去注册”即代表同意</Label>
                        <Text style={styles.registerStyle}
                            onPress={() => Actions.Protocol({ headerTitle: '注册协议' })}
                        >
                            《速必达注册协议》
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    onRegisterPress = () => {
        Actions.PersonalInfo({ headerTitle: '完善个人信息' });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bannerStyle: {
        marginTop: px2dp(130),
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerImageStyle: {
        width: SCREEN_WIDTH,
        height: px2dp(320),
    },
    formStyle: {
        width: SCREEN_WIDTH - px2dp(80),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10)
    },
    registerButtonStyle: {
        width: SCREEN_WIDTH - px2dp(180),
        height: px2dp(80),
        marginTop: px2dp(40),
        marginBottom: px2dp(20),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20,
        alignSelf: "center"
    },
    regLabelStyle: {
        color: '#d2282d',
        fontSize: FONT_SIZE(10),
        textAlign: 'center'
    },
    registerStyle: {
        color: '#1d77b3',
        fontSize: FONT_SIZE(10),

    },
});