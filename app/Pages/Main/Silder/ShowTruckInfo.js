/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-28 14:41:03
 * @Description: 侧边栏车辆信息
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, Input } from 'teaset';
import RegInput from './../../../Component/RegInput';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class ShowTruckInfo extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        console.log(this.store.serverUrl);
        this.state = {
            //serverUrlList:  Config.serverUrlList
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
                <View style={{ backgroundColor: 'white', marginTop: px2dp(128) }}>
                    <View style={styles.formStyle}>
                        <RegInput
                            title='车牌颜色'
                            placeholder='选择你的车牌颜色'
                            readOnly={true}
                        //value={this.store.phone}
                        />
                        <RegInput
                            title='车辆类别'
                            placeholder='选择你的车辆类别'
                            readOnly={true}
                        //value={this.store.phone}
                        />
                        <RegInput
                            title='车牌号码'
                            placeholder='例如:粤L66666'
                            readOnly={true}
                        //value={this.store.phone}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    formStyle: {
        width: SCREEN_WIDTH - px2dp(20),
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: px2dp(30),
    },
});