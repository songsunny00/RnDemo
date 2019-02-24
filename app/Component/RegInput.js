/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 09:43:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-28 23:28:58
 * @Description: 注册文本输入框 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Label } from 'teaset';

const RegInput = (props) => {
    return (
            props.onPress || props.readOnly ? 
                    <TouchableOpacity
                        style={iStyle.inputViewStyle}
                        onPress={props.onPress}>
                        <Label style={iStyle.lableStyle} text={props.title} />
                        <Input placeholder={props.placeholder}
                            style={iStyle.inputStyle}
                            onChangeText={props.onChangeText}
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                            maxLength={props.maxLength}
                            autoCapitalize='none'
                            editable={false}
                            clearButtonMode={'always'}
                            value={props.value ? props.value : ''}
                        />
                    {props.onPress ?
                        <Icon size={25} name='chevron-right'
                            onPress={props.onPress}
                            style={iStyle.boxIcon} />
                    : null}
                    </TouchableOpacity>
            :
            <View style={iStyle.inputViewStyle}>
                <Label style={iStyle.lableStyle} text={props.title} />
                <Input placeholder={props.placeholder}
                    style={iStyle.inputStyle}
                    onChangeText={props.onChangeText}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    maxLength={props.maxLength}
                    autoCapitalize='none'
                    clearButtonMode={'always'}
                    value={props.value ? props.value : ''}
                />
                {props.isCamera ?
                    <Icon size={25} name='camera'
                        onPress={props.showCamera}/>
                    : null}
            </View>
    )
}

export default RegInput;

const iStyle = StyleSheet.create({
    inputViewStyle: {
        height: px2dp(88),
        marginTop: px2dp(20),
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: px2dp(1),
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        borderColor: 'transparent',
        borderRadius: 0,
        height: px2dp(86),
        flex: 1,
        backgroundColor: 'transparent',
        textAlign:'right',
    },
    lableStyle: {
        fontSize: FONT_SIZE(12),
    },
    boxIcon: {
        color:'#d1d1d1',
    }
});