/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 09:43:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-07 17:54:49
 * @Description: 菜单行 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Label } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MenuRow = (props) => {

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={props.onPress}
        >
            <View style={styles.rowStyle}>
                <Icon size={20} name={props.icon} style={[styles.rowIcon,{ color: props.color }]} />
                <Label style={styles.rowText}>{props.title}</Label>
                {props.rightText?<Label style={styles.rightText}>{props.rightText}</Label>:null}
            </View>
        </TouchableOpacity>
        )
    }
    
export default MenuRow;
    
const styles = StyleSheet.create({
    rowStyle: {
        height: px2dp(80),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        //justifyContent: 'center',
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: px2dp(1),
    },
    rowIcon: {
        marginLeft: px2dp(20),
        marginRight: px2dp(10),
    },
    rowText: {
        fontSize: FONT_SIZE(12),
        color: Color.txtPrimary,
        lineHeight: px2dp(80),
        width:px2dp(320)
    },
    rightText: {
        fontSize: FONT_SIZE(12),
        color: Color.txtLightPrimary,
        lineHeight: px2dp(80),
        textAlign:'right'
    }
});