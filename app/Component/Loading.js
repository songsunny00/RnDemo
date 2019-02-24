/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-29 10:30:07 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-29 10:04:48
 * @Description: 初始化 
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

const Loading = (props) => {
    return(
    <View style={styles.container}>
        <View style={{marginTop:-100}}>
        <ActivityIndicator
            animating={true}
            color={Color.blue}
            size='large'
        />
        </View>
        <Text style={[styles.textStyle, { marginLeft: 7,marginTop:7 }]}>数据加载中...</Text>
    </View>
    )
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        height:SCREEN_HEIGHT,
        flexDirection: 'column',
        backgroundColor:'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 14,
        color: Color.txtLightPrimary
    }
});