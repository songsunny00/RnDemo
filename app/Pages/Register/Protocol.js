/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-29 13:30:40
 * @Description: 注册协议 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView
} from 'react-native';

import { Button, NavigationBar, Input } from 'teaset';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Protocol extends Component {
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
                    <View style={styles.flex}> 
                        <WebView 
                            automaticallyAdjustContentInsets={false}
                            style={{ width: SCREEN_WIDTH }} 
                            source={{ uri: 'http://www.jianshu.com/u/d5b531888b2b' }} 
                            startInLoadingState={true}
                            //injectedJavaScript ={"alert('测试一下injectedJavaScript属性')"}
                            onLoadStart = {() => {
                                console.log('onLoadStart');
                            }} 
                            renderError={() => {
                                console.log('renderError');
                                return (<View><Text>回调了，出现错误</Text></View>)
                            }}> 
                        </WebView> 
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
    flex: {
        flex:1
    }
});