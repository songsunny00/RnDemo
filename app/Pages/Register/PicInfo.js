/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:25:30 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-11 15:25:44
 * @Description: 完善照片信息 
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
import PicUploadBoxListView from './../../Component/PicUploadBox';
import ImagePicker from 'react-native-image-crop-picker';

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

export default class PicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        
    }

    showPull(side, modal, text, item, rootTransform) {
        let overlayView = (
            <Overlay.View side={side} modal={modal} 
                overlayOpacity={0.1}
                rootTransform={rootTransform} ref={v => this.overlayPullView = v}>
                <View style={styles.overlayViewStyle}>
                    <View style={styles.wrapStyle} >
                        <Image
                            source={item.pic}
                            style={styles.imageStyle}
                        />
                        <Button title='拍照' style={styles.overViewButtonStyle} 
                            titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                            onPress={() => {
                                ImagePicker.openCamera({
                                    width: px2dp(493),
                                    height: px2dp(309),
                                    cropping: true
                                }).then(image => {
                                    console.log(image);
                                });
                            } 
                        }/>
                        <Button title='相册' style={styles.overViewButtonStyle}
                            titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                            onPress={() => {
                                ImagePicker.openPicker({
                                    width: px2dp(493),
                                    height: px2dp(309),
                                    cropping: true
                                }).then(image => {
                                    console.log(image);
                                });
                            }
                        }/>
                        <Button title='取消' style={styles.overViewButtonStyle}
                            titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                            onPress={() => this.overlayPullView && this.overlayPullView.close()} />
                    </View>
                </View>
            </Overlay.View>
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
                    currentPosition={2} 
                    labels={labels} />
                
                <View style={styles.formStyle}>
                    <Label type='title' style={styles.titleLabelStyle}>请清晰拍摄一下照片，有助于快速审核通过</Label>
                    <View style={styles.picBoxContainer}>
                        <PicUploadBoxListView 
                           onPress={(item)=>{
                                this.showPull('bottom', true, '上传照片', item);
                           }}/>
                    </View>
                    <Button title={'完成'}
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
        Actions.ResultInfo();
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
        backgroundColor: '#F5F5F9',
        width: SCREEN_WIDTH,
        padding: px2dp(10),
        textAlign: 'center'
    },
    formStyle: {
        width: SCREEN_WIDTH - px2dp(20),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: px2dp(30),
    },
    buttonStyle: {
        height: px2dp(80),
        marginTop: px2dp(100),
        width: SCREEN_WIDTH - px2dp(280),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20
    },
    picBoxContainer:{
        flexDirection: "row",
        flexWrap: "wrap",
        width: SCREEN_WIDTH-px2dp(115),
        margin: px2dp(20),
        justifyContent: 'space-between'
    },
    overlayViewStyle: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT, 
    },
    cellTitleStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE(14),
        marginTop: px2dp(160),
    },
    imageStyle: {
        marginTop: px2dp(60),
        width: px2dp(493),
        height: px2dp(309),
    },
    wrapStyle: {
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        // width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT*0.75, 
    },
    overViewButtonStyle: {
        height: px2dp(80),
        marginTop: px2dp(20),
        //width: SCREEN_WIDTH - px2dp(280),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 10
    },
});