/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-26 16:00:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 11:22:17
 * @Description: 登录主页 
 */


import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { Button, WhiteSpace, Flex } from 'antd-mobile-rn';

import SplashScreen from 'react-native-splash-screen';
import RNUpdate from "react-native-update-app"; //检查版本升级

import { observer, inject } from 'mobx-react/native';
import LoginInput from '../../Component/LoginInput';

const sysClickNum = 0
@inject(["userStore"], ['locationStore']) // 注入对应的store
@observer
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        this.location = this.props.locationStore;
        this.state = {
            btnDisabled: true,
        };
        if (this.store.phone && this.store.passWord) this.state.btnDisabled = false;
    }

    componentDidMount() {
        SplashScreen.hide();
        this.location.getPermisions();
    }

    onBeforeStart = async () => {
        // 在这里可以发请求，用promise返回结果
        let res = await this.store.updateApp().then((data)=>{
            console.log(data)
        });
        // let res = {
        //     majorVersionNumber: 1, 
        //     minorVersionNumber: 0, 
        //     revisionNumber: 0, 
        //     fileUrl: "group1:M00/00/30/CkQarlti0keAWj_dAdtJlxH05Q8376.apk", 
        //     fileName: "app-release.apk", 
        //     upgradeFlag: 0, 
        //     updateContent: "送装销", 
        //     version: "1.0.0", 
        //     releaseTime: "2018-03-12 18:24:56", 
        //     downloadUrl: "http://10.69.10.70/module-api/app/common/downloadApp", 
        //     androidUrl: "http://183.61.66.131/group1/M00/00/30/CkQarlti0keAWj_dAdtJlxH05Q8376.apk", 
        //     iosUrl: "https://itunes.apple.com/cn/app/%E5%90%8C%E5%9F%8E%E9%85%8D/id1300013507?mt=8", 
        //     appType: "driver"
        // }
        return res;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            sysClickNum++;
                            if (sysClickNum === 4) {
                                sysClickNum = 0;
                                Actions.SysConfig({ headerTitle: '系统配置' })
                            }
                        }}>
                        <Image
                            source={Images.Logo}
                            style={styles.logoImageStyle}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.loginViewStyle}>
                        <LoginInput
                            placeholder='请输入用户名'
                            onChangeText={(text) => {
                                this.store.phone = text;
                                if (this.store.passWord && text) {
                                    this.setState({
                                        btnDisabled: false
                                    })
                                } else {
                                    this.setState({
                                        btnDisabled: true
                                    })
                                }
                            }}
                            value={this.store.phone}
                            icon="cellphone-iphone"
                        />
                        <View>
                            <LoginInput
                                placeholder='请输入密码'
                                isPassWord={true}
                                onChangeText={(text) => {
                                    this.store.passWord = text;
                                    if (this.store.phone && text) {
                                        this.setState({
                                            btnDisabled: false
                                        })
                                    } else {
                                        this.setState({
                                            btnDisabled: true
                                        })
                                    }
                                }}
                                value = {this.store.passWord}
                                isPassword={true}
                                icon="lock"
                            />
                            {/* <LoginInput
                                placeholder='请输入验证码'
                                onChangeText={(text) => {
                                    this.store.phone = text;
                                }}
                                isVerify={true}
                                sendSMSCode={() => {}}
                                value={this.store.phone}
                                icon="cellphone-iphone"
                            /> */}
                            
                        </View>
                        <WhiteSpace />
                        <WhiteSpace /> 
                        <Flex>
                        <Flex.Item style={{ paddingBottom: 4 }}>
                        <Button type="primary"
                            disabled={this.state.btnDisabled}
                            onClick={() => this.onLoginPress()}
                        >登录</Button>
                        </Flex.Item>
                        </Flex>
                        {/*tag1
                        <View style={{ alignItems: 'center', marginTop: px2dp(44) }}>
                            <Text style={styles.forgetPwdStyle}
                                onPress={() => Actions.ForgetPwd({ headerTitle: '忘记密码' })}
                            >
                                忘记密码
                                </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: px2dp(34) }}>
                            <Text style={styles.registerStyle}
                                onPress={() => Actions.RegAccount({ headerTitle: '注册' })}
                            >
                                还没有账号？现在去快速注册
                                </Text>
                        </View>
                        */}
                    </View>
                    {this.store.enviroment != '外网生产' ? 
                        <Text style={styles.logoLabelStyle}>{this.store.enviroment}</Text>
                        : null
                    }
                    {/**/}
                    <RNUpdate
                        ref={r => global.$RNUpdate = r}
                        onBeforeStart={this.onBeforeStart}
                        progressBarColor="#f50"
                        updateBoxWidth={px2dp(580)}     // 选填，升级框的宽度
                        updateBoxHeight={px2dp(600)}      // 选填，升级框的高度
                        updateBtnHeight={px2dp(76)}       // 选填，升级按钮的高度
                        bannerImage={Images.VersionUpgrade}  // 选填，换升级弹框图片
                        bannerHeight={px2dp(270)} 
                        bannerWidth={px2dp(270)} 
                        bannerResizeMode={'cover'}
                    />
                </View>
            </View>
        );
    }

    onLoginPress = () => {
        Toast.loading(`加载中，请稍后`)
        this.store.login().then((data)=>{
            //Toast.hide();
            Actions.Workbench();
        }).catch((err)=>{
            //Toast.hide();
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logoStyle: {
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImageStyle: {
        width: SCREEN_WIDTH,
        height: px2dp(400),
    },
    logoLabelStyle: {
        color: '#d2282d',
        fontSize: FONT_SIZE(12),
        marginTop: px2dp(60),
        //bottom: px2dp(20),
    },
    loginViewStyle: {
        //backgroundColor:'red',
        marginTop: px2dp(60),
        width: SCREEN_WIDTH - px2dp(120),
        alignItems: 'center',
    },
    loginButtonStyle: {
        height: px2dp(80),
        marginTop: px2dp(100),
        width: SCREEN_WIDTH - px2dp(120),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20

    },
    registerStyle: {
        color: Color.blue,
        fontSize: FONT_SIZE(12),

    },
    forgetPwdStyle: {
        color: Color.red,
        fontSize: FONT_SIZE(12),
    }
});