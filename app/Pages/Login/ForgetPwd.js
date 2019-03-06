/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-15 15:15:37 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-25 13:23:16
 * @Description: 忘记密码页面 
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

import LoginInput from './../../Component/LoginInput';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class ForgetPwd extends Component {
    serverUrlList = Config.serverUrlList;

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
                        sendSMSCode={() => { console.log("发验证码")}}
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
                    <Button title={'确定'}
                        style={styles.resetButtonStyle}
                        titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                        onPress={() => this._onSavePress()}
                    />
                </View>
            </View>
        );
    }

    _onSavePress = () => {
        Actions.pop();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    formStyle: {
        marginTop: px2dp(148),
        borderColor:"#d1d1d1",
        borderWidth: px2dp(2),
        width: SCREEN_WIDTH - px2dp(80),
        borderRadius: px2dp(20),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10)
    },
    resetButtonStyle: {
        width: SCREEN_WIDTH - px2dp(180),
        height: px2dp(80),
        marginTop: px2dp(40),
        marginBottom: px2dp(20),
        backgroundColor: Color.primary,
        borderColor: Color.primary,
        borderRadius: 20,
        alignSelf: "center"
    },
});