/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 09:43:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-21 16:02:26
 * @Description: 选择车牌颜色 
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
import { Input } from 'teaset';

const TruckCodeColorView = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPress}
        >
            {props.code != 'yellowGreen' ?
                <View style={styles.cellWarpStyle}>
                    <View style={[styles.cellStyle, { backgroundColor: props.color }]}>
                        <Text style={styles.cellTextStyle}>
                            {props.text}
                        </Text>
                    </View>
                </View>
                :
                <View style={styles.cellWarpStyle}>
                    <View style={styles.cellLeftStyle}>
                        <Text style={styles.cellTextStyle}>
                            黄
                        </Text>
                    </View>
                    <View style={styles.cellRightStyle}>
                        <Text style={styles.cellTextStyle}>
                            绿牌
                        </Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}

const TruckCodeColorListView = (props) => {
    truckCodeColorList = props.truckCodeColorList;
    //console.log(truckCodeColorList);
    return boxs = truckCodeColorList.map((item, index) => {
        return (
            <TruckCodeColorView
                key={item.key}
                text={item.name}
                code={item.code}
                color={item.color}
                onPress={() => props.onPress(item) }
            />
        );
    });
}

export default TruckCodeColorListView;

const styles = StyleSheet.create({
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
});
