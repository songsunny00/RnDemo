/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:25:30 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-11 10:11:06
 * @Description: 完善车辆信息 
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
import Steps from './../../Component/Steps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { observer, inject } from 'mobx-react/native';
import RegInput from './../../Component/RegInput';
import TruckCodeColorListView from './../../Component/TruckColor';
import TruckClassView from './../../Component/TruckClass';

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
export default class TruckInfo extends Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.userStore; //通过props来导入访问已注入的store
        this.state = {};
    }

    showDefault(modal, text) {
        let overlayView = (
            <Overlay.View
                style={styles.overlayViewStyle}
                modal={modal}
                overlayOpacity={null}
                ref={v => this.overlayView = v}
            >
                <View style={styles.overlayStyle}>
                    <Label text={text} style={styles.cellTitleStyle}/>
                    {modal ? 
                        <View>
                            <TruckCodeColorListView 
                                onPress={(item)=>{
                                    //Toast.message("选择的车牌颜色:" + item.name);
                                    this.userStore.getTruckCode(item);
                                    this.overlayView && this.overlayView.close();
                                }}
                                truckCodeColorList={Config.truckCodeColorList}
                            />
                        </View>
                    : null}
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }

    showPull(side, modal, text, rootTransform) {
        let overlayView = (
            <Overlay.PullView side={side} modal={modal} rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
                <View style={styles.overlayPullViewStyle}>
                    <Label text={text} style={styles.cellTitleStyle} />
                    {modal ? 
                        <View> 
                            <TruckClassView getTruckClass={(name, length)=>{
                                //Toast.message("选择的车辆类别:" + name + "-->" + length);
                                this.userStore.getTruckClass(name, length);
                                this.overlayPullView && this.overlayPullView.close();
                            }}/>
                        </View>
                    : null}
                </View>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
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
                    currentPosition={1} 
                    labels={labels} />
                
                <View style={styles.formStyle}>
                    <Label type='title' style={styles.titleLabelStyle}>车辆信息资料</Label>
                    <RegInput
                        title='车牌颜色'
                        placeholder='选择你的车牌颜色'
                        value={this.userStore.truckCode.name}
                        onPress={() => { this.showDefault( true, '选择车牌颜色')}}
                    />
                    <RegInput
                        title='车辆类别'
                        placeholder='选择你的车辆类别'
                        value={this.userStore.truckClass.showName}
                        onPress={() => this.showPull('bottom', true, '选择车辆类别')}
                    />
                    <RegInput
                        title='车牌号码'
                        placeholder='例如:粤L66666'
                        onChangeText={(text) => {

                        }}
                    //value={this.store.phone}
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
        Actions.PicInfo({ headerTitle: '上传照片' })
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
    cellTitleStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE(14),
        margin: px2dp(10),
    },
    cellWarpStyle: {
        margin: px2dp(2), 
        borderRadius: px2dp(20), 
        borderWidth: px2dp(1),
        borderColor: "#106CF7",
        margin: px2dp(10),
        width: SCREEN_WIDTH - px2dp(440),
        justifyContent: 'center',
        flexDirection: 'row',
    },
    cellStyle: {
        height: px2dp(80),
        borderRadius: px2dp(20),
        backgroundColor: "blue",
        margin: px2dp(4),
        flex: 1,
    },
    cellTextStyle: {
        color: "#fff",
        fontSize: FONT_SIZE(12),
        textAlign: 'center',
        lineHeight: px2dp(80),
    },
    cellLeftStyle: {
        height: px2dp(80),
        borderTopLeftRadius: px2dp(20),
        borderBottomLeftRadius: px2dp(20),
        backgroundColor: "#F0EB17",
        marginTop: px2dp(4),
        marginLeft: px2dp(4),
        marginBottom: px2dp(4),
        flex: 1,
    },
    cellRightStyle: {
        height: px2dp(80),
        borderTopRightRadius: px2dp(20),
        borderBottomRightRadius: px2dp(20),
        backgroundColor: "#88F40B",
        marginTop: px2dp(4),
        marginRight: px2dp(4),
        marginBottom: px2dp(4),
        flex: 2,
    },
    overlayViewStyle: {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    overlayStyle: {
        backgroundColor: Theme.defaultColor, 
        width: SCREEN_WIDTH - px2dp(240),
        padding: px2dp(40), 
        borderRadius: px2dp(15), 
        alignItems: 'center'
    },
    overlayPullViewStyle: {
        backgroundColor: Theme.defaultColor, 
        width: SCREEN_WIDTH,
        minHeight: px2dp(340), 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});