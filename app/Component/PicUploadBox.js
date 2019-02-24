/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-04-30 15:24:34 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-08 18:36:10
 * @Description: 照片上传 
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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PicUploadBox = (props) => {
    return(
        <TouchableHighlight style={iStyle.touchBox} underlayColor="#eee" onPress={props.onPress}>
            <View style={iStyle.boxContainer}>
                <Icon size={60} name='camera' style={iStyle.boxIcon}></Icon>
                <Text style={iStyle.boxText}>{props.text}</Text>
            </View>
        </TouchableHighlight>
    )
}

const PicUploadBoxListView = (props) => {
    PicUploadList = Config.PicUploadList;
    //console.log(truckCodeColorList);
    return boxs = PicUploadList.map((item, index) => {
        return (
            <PicUploadBox
                key={item.key}
                text={item.text}
                onPress={() => props.onPress(item)}
            />
        );
    });
}

export default PicUploadBoxListView;

const iStyle = StyleSheet.create({
    touchBox:{
        borderWidth: pixel,
        borderColor: "#ccc",
        flexDirection: 'row',
        marginVertical: px2dp(20)
    },
    boxContainer:{
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH / 3 - px2dp(80),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    boxIcon:{
        color: '#F0D3D3',
    },
    boxText:{
        fontSize: FONT_SIZE(10),
        textAlign:"center",
        backgroundColor:"transparent"
    },
});
