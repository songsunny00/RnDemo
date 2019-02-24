/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-17 16:14:07
 * @Description: 侧边栏照片信息
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, Input, Label } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PicUploadBoxListView from './../../../Component/PicUploadBox';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class ShowPicInfo extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        console.log(this.store.serverUrl);
        this.state = {
            //serverUrlList:  Config.serverUrlList
            userId: 'liudehua-aaa'
        };
    }

    componentDidMount() {
        //this.store.getConfig();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.headerTitle}
                    type='ios'
                    style={{ height: px2dp(128), backgroundColor: Color.primary }}
                    statusBarStyle='default'

                    leftView={
                        <NavigationBar.BackButton title='返回' onPress={() => Actions.pop()} />
                    }
                />
                <View style={styles.formStyle}>
                    <View style={styles.boxContainer}>
                        <Icon size={40} name='emoticon-happy' style={styles.boxIcon}></Icon>
                        <Label type='title' style={styles.titleLabelStyle1}>审核通过</Label>
                    </View>
                    <View style={styles.picBoxContainer}>
                        <PicUploadBoxListView />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F6F8',
        alignItems: 'center',
    },
    formStyle: {
        width: SCREEN_WIDTH - px2dp(20),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: px2dp(158)
    },
    boxContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: px2dp(5)
    },
    boxIcon: {
        color: "#0599fc",
    },
    picBoxContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: SCREEN_WIDTH - px2dp(115),
        margin: px2dp(20),
        justifyContent: 'space-between'
    },
});