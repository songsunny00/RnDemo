
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Images from './../Resources/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'teaset';
import { InputItem,Flex } from 'antd-mobile-rn';
import TimerButton from './TimerButton';

export default class LoginInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPwd: false,
        };
    }
    render() {
    let pwdImg = !this.state.showPwd ? Images.CloseEye : Images.OpenEye;
    let props = this.props;
    return (
        <View style={iStyle.inputViewStyle}>
            <Flex>
            {
                props.isPassword ?
                <Flex.Item style={{ paddingBottom: 4 }}>
                    <InputItem
                        clear
                        labelNumber={2}
                        type={!this.state.showPwd?"password":"text"}
                        value={props.value ? props.value : ''}
                        onChange={props.onChangeText}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        extra={<Image style={iStyle.imageStyle} source={pwdImg} />}
                        onExtraClick={()=>{
                            this.setState({
                                showPwd: !this.state.showPwd,
                            });
                        }}
                        placeholder={props.placeholder}
                    >
                    <Icon size={25} name={props.icon} style={iStyle.boxIcon} />
                    </InputItem>
                </Flex.Item>
                :
                <Flex.Item style={{ paddingBottom: 4 }}>
                    <InputItem
                        clear
                        labelNumber={2}
                        type="text"
                        value={props.value ? props.value : ''}
                        onChange={props.onChangeText}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        placeholder={props.placeholder}
                        extra={props.isVerify ?
                            <TimerButton
                                style={iStyle.timerButtonStyle}
                                timerCount={60}
                                textStyle={{ color: '#dc1466', fontSize: FONT_SIZE(12) }}
                                onClick={props.sendSMSCode}
                            />
                            : null}
                        onExtraClick={()=>{
                            
                        }}
                    >
                    <Icon size={25} name={props.icon} />
                    </InputItem>
                </Flex.Item>
            }
            </Flex>
        </View>
    )
}
}

// export default LoginInput;

const iStyle = StyleSheet.create({
    inputViewStyle: {
        height: px2dp(88),
        marginTop: px2dp(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        borderColor: 'transparent',
        borderRadius: 0,
        height: px2dp(86),
        flex: 1,
        backgroundColor: 'transparent',
    },
    vertifyStyle: {
        borderColor: 'transparent',
        borderRadius: 0,
        height: px2dp(86),
        width: px2dp(400),
        backgroundColor: 'transparent',
    },
    inputTitleStyle: {
        fontSize: FONT_SIZE(12),
        color: '#333'
    },
    imageStyle: {
        height: px2dp(30),
        width: px2dp(30),
        marginLeft: px2dp(10),
    },
    timerButtonStyle: {
        //right:px2dp(10),
        //position: 'absolute',
    },
    timerTextStyle: {
        color: '#dc1466',
        //fontSize: FONT_SIZE(12),
    }
});