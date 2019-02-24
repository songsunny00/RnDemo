/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 17:22:15
 * @Description: 意见反馈 
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

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Feedback extends Component {
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
                <View style={{ marginTop: px2dp(128) }}>
                    <View style={styles.inputViewStyle}>
                        <Input placeholder={'我要吐槽'}
                            style={styles.inputStyle}
                            onChangeText={(text) => {

                            }}
                            multiline={true}
                            autoCapitalize='none'
                            clearButtonMode={'always'}
                        />
                    </View>
                    <Button title={'提交'}
                        style={styles.btnStyle}
                        titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                        onPress={() => this._onSavePress()}
                    />
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
    
    inputViewStyle: {
        marginTop: px2dp(20),
        borderColor: '#d1d1d1',
        borderWidth: px2dp(1),
        borderRadius: 5,
        height: SCREEN_HEIGHT * 0.4,
        width: SCREEN_WIDTH - px2dp(180),
        backgroundColor: '#fff',
    },
    inputStyle: {
        borderColor: 'transparent',
        borderRadius: 0,
        textAlignVertical: 'top',
        flex: 1,
        backgroundColor: 'transparent',
    },
    btnStyle: {
        width: SCREEN_WIDTH * 0.5,
        height: px2dp(80),
        marginTop: px2dp(40),
        marginBottom: px2dp(20),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 10,
        alignSelf: "center"
    },
});