/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-25 17:51:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-02 16:22:12
 * @Description:  订单item信息
 */


import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Input,
    Label
} from 'teaset';


const OrderItem = ({
    order,
    showDetail
}) => {
    //console.log(order);
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => showDetail(order)}>
            <View style={styles.containerOrder}>
                <Image
                    source={Config.Y_Status[order.taskStatus].pic}
                    style={styles.statusStyle}
                />
                <View style={[styles.itemBox, styles.borderStyle, { justifyContent: "flex-start" }]}>
                    <Icon size={20} name='truck' style={styles.boxIcon} />
                    <Label type="title" style={styles.title}>{order.gridNo}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='file-document' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>客户订单号：{order.customerNo}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='archive' style={styles.boxIcon} />
                    <Label style={styles.lable}>货物：</Label>
                    <Label style={styles.lableWarn}>
                            {order.qty}件，{order.weight}公斤，{order.volume}方
                    </Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='map-marker-radius' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>收货地址：{order.address}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='contacts' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>收货人：{order.consignee}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='timetable' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>要求送达时间：{order.deliveryTime}</Label>
                </View>
                <Icon size={40} name='phone' style={styles.phoneIcon} onPress={()=>{
                    let url = "tel:" + order.mobilePhone;
                    Linking.canOpenURL(url).then(supported => {
                        if (!supported) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            return Linking.openURL(url);
                        }
                    }).catch(err => console.error('An error occurred', err));

                }}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    containerOrder: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width:0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2,
        backgroundColor: '#fff',
        marginHorizontal: px2dp(15),
        marginVertical: px2dp(5)
    },
    title: {
        marginLeft: px2dp(10),
        fontSize: FONT_SIZE(14),
    },
    lable: {
        fontSize: FONT_SIZE(14),
    },
    lableWarn: {
        color: "#FC6605",
    },
    itemBox: {
        marginTop: px2dp(5),
        marginBottom: px2dp(5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    borderStyle: {
        borderBottomColor: '#ddd',
        borderBottomWidth: px2dp(1),
        paddingBottom: px2dp(5),
    },
    boxIcon: {
        marginLeft: px2dp(15),
        marginRight: px2dp(5),
    },
    phoneIcon: {
        position: 'absolute',
        bottom: px2dp(20),
        right: px2dp(20)
    },
    statusStyle: {
        width: px2dp(180),
        height: px2dp(180),
        position: "absolute",
        right: px2dp(5),
        top: px2dp(5),
        backgroundColor: Theme.transparentColor,
    }
});

export default OrderItem;