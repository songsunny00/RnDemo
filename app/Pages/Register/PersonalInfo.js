/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:25:30 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-11 10:00:56
 * @Description: 完善个人信息 
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import { Button, NavigationBar, Input, Label } from 'teaset';
import Steps from './../../Component/Steps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { observer, inject } from 'mobx-react/native';
import RegInput from './../../Component/RegInput';

const labels = ["个人资料", "车辆信息", "上传照片"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: px2dp(2),
    currentStepStrokeWidth: px2dp(3),
    stepStrokeCurrentColor: '#1d77b3',
    stepStrokeWidth: px2dp(3),
    stepStrokeFinishedColor: '#1d77b3',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1d77b3',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#1d77b3',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: FONT_SIZE(13),
    currentStepIndicatorLabelFontSize: FONT_SIZE(13),
    stepIndicatorLabelCurrentColor: '#1d77b3',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: FONT_SIZE(13),
    currentStepLabelColor: '#1d77b3'
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
        name: 'account',
        color: '#ffffff',
        size: 15,
    };

    switch (stepStatus) {
        case "current": {
            iconConfig.color = '#1d77b3';
            break;
        }
        case "unfinished": {
            iconConfig.color = '#aaaaaa';
            break;
        }
        case "finished": {
            iconConfig.color = '#ffffff';
            break;
        }
        default: {
            break;
        }
    }

    switch (position) {
        case 0: {
            iconConfig.name = 'account';
            break;
        }
        case 1: {
            iconConfig.name = 'truck';
            break;
        }
        case 2: {
            iconConfig.name = 'image';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};

@inject(["userStore"]) // 注入对应的store
@observer
export default class PersonalInfo extends Component {
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
     
                <Steps 
                    stepCount={3}
                    style={styles.stepIndicator} 
                    renderStepIndicator={this.renderStepIndicator}
                    customStyles={customStyles} 
                    currentPosition={0} 
                    labels={labels} />
                
                <View style={styles.formStyle}>
                    <Label type='title' style={styles.titleLabelStyle}>个人资料</Label>
                    <RegInput
                        title='姓名'
                        placeholder='输入您真实姓名'
                        onChangeText={(text) => {

                        }}
                        //value={this.store.phone}
                    />
                    <RegInput
                        title='身份证号'
                        placeholder='输入您真实身份证号'
                        onChangeText={(text) => {

                        }}
                        //value={this.store.phone}
                    />
                    <RegInput
                        title='紧急联系人'
                        placeholder='输入您紧急联系人'
                        onChangeText={(text) => {

                        }}
                    //value={this.store.phone}
                    />
                    <RegInput
                        title='紧急联系人电话'
                        placeholder='输入您紧急联系人电话'
                        onChangeText={(text) => {

                        }}
                    //value={this.store.phone}
                    />
                    <RegInput
                        title='工作城市'
                        placeholder='提交后不可更改'
                        value={this.store.workCity.cityName}
                        onPress={() => Actions.CityPicker({ headerTitle: '选择工作城市' })}
                    />
                    <Button title={'下一步'}
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
        //Actions.CityPicker({ headerTitle: '选择工作城市' });
        Actions.TruckInfo({ headerTitle: '完善车辆信息' })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stepIndicator: {
        marginTop: px2dp(150),
    },
    formStyle: {
        width: SCREEN_WIDTH - px2dp(20),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: px2dp(30),
    },
    titleLabelStyle: {
        fontSize: FONT_SIZE(14),
        marginTop: px2dp(10),
        backgroundColor: '#F5F5F9',
        width: SCREEN_WIDTH,
        padding: px2dp(10),
        textAlign: 'center'
    },
    buttonStyle: {
        height: px2dp(80),
        marginTop: px2dp(180),
        width: SCREEN_WIDTH - px2dp(280),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20
    },
});