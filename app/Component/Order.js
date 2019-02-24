/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-25 17:51:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 13:32:17
 * @Description:  订单详细信息
 */

import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    View,
    StyleSheet,
    Linking,
    Animated,
    FlatList,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Input,
    Label,
    Button
} from 'teaset';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import { CustomCachedImage } from "react-native-img-cache";
import ImageProgress from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { observer, inject } from 'mobx-react/native';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Good = ({
    good
}) => {
    //console.log(good);
    return (
        <View style={styles.goodsBox}>
            <View style={styles.itemBox}>
                <Icon size={15} name='package' style={styles.boxIcon} />
                <Label style={styles.lable}>商品名称：</Label>
                <Label style={styles.lableWarn}>
                    {good.productName}
                </Label>
            </View>
            <View style={styles.itemBox}>
                <Icon size={15} name='content-paste' style={styles.boxIcon} />
                <Label style={styles.lableWarn}>
                    {good.qty}件，{good.weight}公斤，{good.volume}方
                </Label>
            </View>
        </View>
    )
};
//http://183.61.66.131/group1/M00/00/2F/CkQarltat8KAWzWOAHvLO4qBLQ0039.jpg
const PicBox = ({ url, picIndex, order }) => {
    return (
        <TouchableHighlight style={iStyle.touchBox} underlayColor="#eee" onPress={()=> {
            Actions.ReceiptPic({ picIndex, order})
        }}>
            <View style={iStyle.boxContainer}>
                {/*<CachedImage source={{ uri: url }} style={iStyle.imgStyle} />*/}
                <CustomCachedImage component={ImageProgress} source={{ uri: url }} indicator={ProgressBar}
                    style={iStyle.imgStyle} />
            </View>
        </TouchableHighlight>
    )
}

@observer
export default class Order extends Component {
    render() {
        let { order, feedback, location, finish } = this.props;
        let boxs;
        if (order.taskStatus == '2' && order.pictureList ) {
            boxs = order.pictureList.slice().map((item, i) => {
                return (<PicBox url={item} key={"pic_" + i} picIndex={i} order={order} />)
            })
        } 

        let signTip;

        if (order.taskStatus == '1' ) {
            signTip =  (
                location.isSign ?
                    <View style={styles.tipsWrap}>
                        <Icon size={20} name='check-circle' style={[styles.tipsIcon, { color: '#0e932e' }]} />
                        <Label style={[styles.tipsLabel, { color: '#0e932e' }]}>离收货地址:{location.distance},已在签收范围,可以送达签收</Label>
                    </View>
                :
                    <View style={styles.tipsWrap}>
                        <Icon size={20} name='information' style={styles.tipsIcon} />
                        <Label style={styles.tipsLabel}>距送货地址:{location.distance},不在签收范围,不能送达签收</Label>
                    </View> 
            )
        } 
    
    return (
        <View style={styles.containerOrder}>
            {signTip}
            <ScrollView>
                <Image
                    source={Config.Y_Status[order.taskStatus].pic}
                    style={styles.statusStyle}
                />
                <View style={[styles.itemBox, styles.borderStyle, { justifyContent: "flex-start" }]}>
                    <Icon size={20} name='chevron-double-right' style={styles.boxIcon} />
                    <Label type="title" style={styles.title}>配送信息</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='truck' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>排线号：{order.gridNo}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='grid-large' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>运单号：{order.transportNo}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='timetable' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>要求送达时间：{order.deliveryTime}</Label>
                </View>
                
                <View style={styles.itemBox}>
                    <Icon size={15} name='map-marker-radius' style={styles.boxIcon} />
                    <Label type="title" numberOfLines={3} style={styles.lable}>送货地址：{order.address}</Label>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        location.getCurrentPosition();
                        location.getDistance(
                            Number.parseFloat(order.consigneelat), 
                            Number.parseFloat(order.consigneelng)
                        );
                    }}
                >
                    <View style={styles.itemBox}>
                        <Icon size={15} name='map-marker-radius' style={styles.boxIcon} />
                        <Label type="title" numberOfLines={3} style={styles.lable}>我的位置：{location.address}</Label>
                    </View>
                </TouchableOpacity>
                <MapView
                    zoom={location.zoom}
                    zoomControlsVisible={false}
                    center={{
                        longitude: location.cenLng, 
                        latitude: location.cenLat
                    }}
                    markers={
                        [{
                            longitude: Number.parseFloat(order.consigneelng),
                            latitude: Number.parseFloat(order.consigneelat),
                            title: order.address
                        },
                        {
                            longitude: Number.parseFloat(location.longitude),
                            latitude: Number.parseFloat(location.latitude),
                            title: location.address
                        }]
                    }
                    style={styles.map}
                    onMarkerClick={(e) => {
                        //console.warn(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                        //console.warn(JSON.stringify(e));
                    }}
                />
                <View style={[styles.borderStyle, { marginVertical: px2dp(20)}]} />
                <View style={[styles.itemBox, { justifyContent: "flex-start" }]}>
                    <Icon size={20} name='chevron-double-right' style={styles.boxIcon} />
                    <Label type="title" style={styles.title}>订单信息</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='file-document' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>客户订单号：{order.customerNo}</Label>
                </View>
                <View style={styles.itemBox}>
                    <Icon size={15} name='contacts' style={styles.boxIcon} />
                    <Label type="title" style={styles.lable}>收货人：{order.consignee}</Label>
                    <Icon size={30} name='phone' style={styles.phoneIcon} onPress={() => {
                        let url = "tel:" + order.mobilePhone;
                        Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                console.log('Can\'t handle url: ' + url);
                            } else {
                                return Linking.openURL(url);
                            }
                        }).catch(err => console.error('An error occurred', err));

                    }} />
                </View>
                {order.ettaDepartDate ? 
                    <View style={styles.itemBox}>
                        <Icon size={15} name='timetable' style={styles.boxIcon} />
                            <Label type="title" style={styles.lable}>发运时间：{order.ettaDepartDate}</Label>
                    </View>
                : null }
                {order.ettaSignTime ?
                    <View style={styles.itemBox}>
                        <Icon size={15} name='timetable' style={styles.boxIcon} />
                        <Label type="title" style={styles.lable}>
                            {order.taskStatus === '2' ? '签收回单时间：' : '异常报备时间：'}{order.ettaSignTime}
                        </Label>
                    </View>
                 : null }
                <View style={[styles.borderStyle, { marginVertical: px2dp(20) }]} />
                <View style={[styles.itemBox, { justifyContent: "flex-start" }]}>
                    <Icon size={20} name='chevron-double-right' style={styles.boxIcon} />
                    <Label type="title" style={styles.title}>商品信息</Label>
                </View>
            
                <AnimatedFlatList
                    data={order.item}
                    renderItem={(item) => <Good good={item.item} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                />
                {order.taskStatus == '2' && order.pictureList ?
                    <View>
                        <View style={[styles.itemBox, styles.borderStyle, { justifyContent: "flex-start" }]}>
                            <Icon size={20} name='chevron-double-right' style={styles.boxIcon} />
                            <Label type="title" style={styles.title}>回单照片</Label>
                        </View>
                        <View style={iStyle.picBoxContainer}>
                            {boxs}
                        </View>
                    </View>
                : null}
                {order.taskStatus == '3'?
                    <View>
                        <View style={[styles.itemBox, styles.borderStyle, { justifyContent: "flex-start" }]}>
                            <Icon size={20} name='chevron-double-right' style={styles.boxIcon} />
                            <Label type="title" style={styles.title}>异常报备原因</Label>
                        </View>
                        <View style={styles.inputViewStyle}>
                            <Input
                                style={styles.inputStyle}
                                value={order.ettaRejectRemark}
                                multiline={true}
                                autoCapitalize='none'
                                editable={false}
                                clearButtonMode={'always'}
                            />
                        </View>
                    </View>
                    : null}
        </ScrollView>
            {order.taskStatus == '1' ?
            <View style={styles.btnWrap}>
                <Button title={'登记异常'}
                    style={styles.btnStyle}
                    titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                        onPress={() => feedback(order)}
                />
                <Button title={'送达签收'}
                    style={styles.btnStyle}
                    disabled={!location.isSign}
                    titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                        onPress={() => finish(order)}
                />
            </View>
        : null }
        </View>
    )}
};

const styles = StyleSheet.create({
    containerOrder: {
        backgroundColor: '#fff',
        flex: 1,
        //borderColor: '#d1d1d1',
        //marginHorizontal: px2dp(15),
        //marginVertical: px2dp(5),
        //borderRadius: px2dp(10),
    },
    title: {
        marginLeft: px2dp(10),
        fontSize: FONT_SIZE(14),
    },
    lable: {
        fontSize: FONT_SIZE(14),
        marginRight: px2dp(50),
    },
    lableWarn: {
        color: "#FC6605",
    },
    itemBox: {
        marginTop: px2dp(10),
        marginBottom: px2dp(10),
        flexDirection: 'row',
        alignItems: 'center',
        padding: px2dp(5),
    },
    borderStyle: {
        borderBottomColor: '#ddd',
        borderBottomWidth: px2dp(2),
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
    btnWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnStyle: {
        height: px2dp(80),
        flex: 1,
        marginVertical: px2dp(5),
        marginHorizontal: px2dp(5),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 0,
    },
    goodsBox: {
        borderColor: '#ddd',
        borderWidth: px2dp(2),
        borderRadius: 5,
        marginHorizontal: px2dp(20),
        marginVertical: px2dp(5)
    },
    map: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.4,
    },
    statusStyle: {
        width: px2dp(300),
        height: px2dp(300),
        position: "absolute",
        right: px2dp(5),
        top: px2dp(5),
        backgroundColor: Theme.transparentColor,
    },
    inputViewStyle: {
        marginLeft: px2dp(15),
        marginVertical: px2dp(10),
        borderColor: '#d1d1d1',
        borderWidth: px2dp(1),
        borderRadius: 5,
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: '#fff',
    },
    inputStyle: {
        borderColor: 'transparent',
        borderRadius: 0,
        textAlignVertical: 'top',
        flex: 1,
        backgroundColor: 'transparent',
    },
    tipsWrap: {
        flexDirection: 'row',
        backgroundColor: '#fffbeb',
        justifyContent: 'center',
        alignItems: 'center',
        height: px2dp(60),
        width: SCREEN_WIDTH,
       
    },
    tipsLabel: {
        color: "#c87c61",
    },
    tipsIcon: {
        marginLeft: px2dp(20),
        marginRight: px2dp(10),
        color: '#c87c61'
    },
});
    
const iStyle = StyleSheet.create({
    picBoxContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: SCREEN_WIDTH - px2dp(100),
        margin: px2dp(20),
        //justifyContent: 'space-between'
    },
    touchBox: {
        borderWidth: pixel,
        borderColor: "#ccc",
        //flexDirection: 'row',
        marginVertical: px2dp(20),
        marginHorizontal: px2dp(12)
    },
    boxContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH / 3 - px2dp(60),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    imgStyle: {
        alignItems: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH / 3 - px2dp(40),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    boxIcon: {
        color: '#F0D3D3',
    },
    boxText: {
        fontSize: FONT_SIZE(10),
        textAlign: "center",
        backgroundColor: "transparent"
    }

});
