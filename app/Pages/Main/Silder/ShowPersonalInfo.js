/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-28 14:37:11
 * @Description: 侧边栏个人资料资
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
export default class ShowPersonalInfo extends Component {
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
                            title='姓名'
                            placeholder='输入您真实姓名'
                            readOnly={true}
                        //value={this.store.phone}
                        />
                        <RegInput
                            title='身份证号'
                            placeholder='输入您真实身份证号'
                            readOnly={true}
                        //value={this.store.phone}
                        />
                        <RegInput
                            title='紧急联系人'
                            placeholder='输入您紧急联系人'
                            readOnly={true}
                        //value={this.store.phone}
                        />
                        <RegInput
                            title='紧急联系人电话'
                            placeholder='输入您紧急联系人电话'
                        //value={this.store.phone}
                            readOnly={true}
                        />
                        <RegInput
                            title='工作城市'
                            placeholder='提交后不可更改'
                            //value={this.store.phone}
                            readOnly={true}
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