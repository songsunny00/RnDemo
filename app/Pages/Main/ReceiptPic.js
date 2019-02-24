/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-29 01:45:10
 * @Description: 侧边栏我的资料 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { CachedImage, ImageCache } from "react-native-img-cache"; //缓存图片
import { Button, AlbumView, Input, Label } from 'teaset';

import { observer, inject } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

@inject(["orderStore"], ["userStore"], ["locationStore"]) // 注入对应的store
@observer
export default class ReceiptPic extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        this.order = this.props.order;
        this.images = [
            // { uri: "file:///data/user/0/com.spdrn/cache/react-native-img-cache/f74417b0592b2c191dfd7e3c430e23607a0059d4.jpg" },
            // { uri: "http://183.61.66.131/group1/M00/00/2F/CkQarltat8KAWzWOAHvLO4qBLQ0039.jpg" },
            // Images.RegBanner,
        ];

        this.order.pictureList.slice().map((item, index) => {
            let url = ImageCache.get().getPath(item,true);
            this.images.push({ uri:  Android ? 'file://' + url : url });
        })

        this.state = {
            images: this.images,
            index: 0, //Number.parseInt(this.props.picIndex),
            control: this.images.length === 1 ? false : true
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <TouchableOpacity
                        activeOpacity={0.5}//点击时的透明度
                        style={styles.btnBox}
                        onPress={() => Actions.pop()}>
                        <Icon name="chevron-left" size={35} color="#fff" />
                        <Label style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', fontSize: FONT_SIZE(14), padding: px2dp(12) }}>{this.props.headerTitle}</Label>
                    </TouchableOpacity>
                </View>
                <View style={styles.wrap}>
                    <AlbumView
                        style={{ flex: 1 }}
                        control={this.state.control}
                        images={this.state.images}
                        thumbs={this.state.images}
                        defaultIndex={this.state.index}
                        onPress={() => console.log('e')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    toolbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: px2dp(10),
        marginTop: px2dp(30),
        top: px2dp(30),
        backgroundColor: "transparent",
        width: SCREEN_WIDTH
    },
    wrap: {
        flex: 1,
        marginBottom: px2dp(50)
    }
});