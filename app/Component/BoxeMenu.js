/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-04-30 15:24:34 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-12 14:05:57
 * @Description: 文件信息说明 
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,    
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const BoxeMenu = ({data, index}) => {
    return(
        <TouchableHighlight style={[iStyle.touchBox, index%3==2?iStyle.touchBox2:iStyle.touchBox1]} underlayColor="#eee" onPress={()=>console.log('a')}>
            <View style={iStyle.boxContainer}>
                <Text style={iStyle.boxText}>{data.title}</Text>
                {data.isFA? <IconFA size={data.size} name={data.icon} style={[iStyle.boxIcon,{color:data.color}]}></IconFA>:
                <Icon size={data.size} name={data.icon} style={[iStyle.boxIcon,{color:data.color}]}></Icon>}
            </View>
        </TouchableHighlight>
    )
}

export default BoxeMenu;

const iStyle = StyleSheet.create({
    mainView:{

    },
    touchBox:{
        width: SCREEN_WIDTH/3-0.33334,
        height:SCREEN_WIDTH/3,
    },
    touchBox1:{
        borderBottomWidth: pixel,
        borderBottomColor:"#ccc",
        borderRightWidth: pixel,
        borderRightColor:"#ccc",
    },
    touchBox2:{
        borderBottomWidth: pixel,
        borderBottomColor:"#ccc",
        borderLeftWidth: pixel,
        borderLeftColor:"#ccc",
    },
    boxContainer:{
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH/3,
        height:SCREEN_WIDTH/3,
    },
    boxIcon:{
        position:"relative",
        top:-10
    },
    boxText:{
        position:"absolute",
        bottom:15,
        width:SCREEN_WIDTH/3,
        textAlign:"center",
        left: 0,
        backgroundColor:"transparent"
    },
});
