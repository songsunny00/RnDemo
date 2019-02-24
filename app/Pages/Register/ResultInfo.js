/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:25:30 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-22 15:48:30
 * @Description: 查看结果 
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, Input, Label, Overlay } from 'teaset';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react/native';
import SplashScreen from 'react-native-splash-screen';

export default class ResultInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={'查看结果'}
                    type='ios'
                    style={{ height: px2dp(128), backgroundColor: Color.primary }}
                    statusBarStyle='default'
                />
     
                <View style={styles.formStyle}>
                    <Label type='title' style={styles.titleLabelStyle}>资料已经提交成功,感谢您的合作,我们将尽快审核</Label>
                    <View style={styles.boxContainer}>
                        <Icon size={120} name='ios-time' style={styles.boxIcon}></Icon>
                        <Label type='title' style={styles.titleLabelStyle1}>等待处理</Label>
                        <Label type='title' style={styles.titleLabelStyle2}>已提交申请，等待审核</Label>
                    </View>
                    <Button title={'去主页'}
                        style={styles.buttonStyle}
                        titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                        onPress={() => this.onRegisterPress()}
                    />
                </View>
            </View>
        );
    }

    renderStepIndicator = params => (
        <Icon {...getStepIndicatorIconConfig(params)} />
    );

    onRegisterPress = () => {
        // ModalIndicator.show(`加载中，请稍后`);
        // this.store.login((data) => {
        //     ModalIndicator.hide();
        //     if (data.exeFlag) {
        //         Actions.Home();
        //     } else {
        //         //Toast.fail(data.message, 'short', 'bottom');
        //         Toast.message(data.message);
        //     }

        // }, (err) => {
        //     ModalIndicator.hide();
        //     Toast.fail("服务暂时不可用，稍后再试~");
        // });
        //Actions.CityPicker({ headerTitle: '选择工作城市' })
        //this.showPull('bottom', true, '上传照片')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stepIndicator: {
        marginTop: px2dp(150),
    },
    titleLabelStyle: {
        fontSize: FONT_SIZE(12),
        marginTop: px2dp(10),
        width: SCREEN_WIDTH,
        padding: px2dp(10),
        textAlign: 'center',
        color: "#95c957",
    },
    formStyle: {
        width: SCREEN_WIDTH - px2dp(20),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: px2dp(128),
    },
    buttonStyle: {
        height: px2dp(80),
        marginTop: px2dp(100),
        width: SCREEN_WIDTH - px2dp(280),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20
    },
    titleLabelStyle1: {
        fontSize: FONT_SIZE(14),
        marginTop: px2dp(10),
        padding: px2dp(10),
        textAlign: 'center',
    },
    titleLabelStyle2: {
        fontSize: FONT_SIZE(12),
        marginTop: px2dp(10),
        padding: px2dp(10),
        textAlign: 'center',
        color: "#a5a5a5",
    },
    boxIcon:{
        color: "#4cd8aa",
    },
    imageStyle: {
        marginTop: px2dp(60),
        width: px2dp(493),
        height: px2dp(309),
    },
    boxContainer: {
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        // width: SCREEN_WIDTH,
        //height: SCREEN_HEIGHT*0.75, 
        height: SCREEN_HEIGHT * 0.333,
        alignItems: "center",
        justifyContent: "center",
    },
});