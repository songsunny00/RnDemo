/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-28 23:32:30
 * @Description: 银行卡 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, Label, ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RegInput from './../../../Component/RegInput';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Card extends Component {
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
                    style={{ height: px2dp(128), backgroundColor: Color.primary, }}
                    statusBarStyle='default'

                    leftView={
                        <NavigationBar.BackButton title='返回' onPress={() => Actions.pop()} />
                    }
                />
                <View style={{ backgroundColor: 'white', marginTop: px2dp(128) }}>
                    <View style={styles.cardBox}>
                        <Label type='title' style={styles.bankName}>中国银行</Label>
                        <Label type='title' style={styles.cardType}>储蓄卡</Label>
                        <Label type='title' style={styles.cardNo}>**** **** **** 5678</Label>
                    </View>
                    <ListRow title='添加银行卡' icon={<Icon size={20} name='plus' />}
                        bottomSeparator='full'/>
                    <View style={styles.formStyle}>
                        <RegInput
                            title='持卡人'
                            placeholder='输入持卡人姓名'
                            onChangeText={(text) => {

                            }}
                        />
                        <RegInput
                            title='银行卡号'
                            placeholder='输入银行卡号'
                            isCamera={true}
                            onChangeText={(text) => {

                            }}
                        />
                        <RegInput
                            title='开户行名称'
                            placeholder='例如:中国银行'
                            onChangeText={(text) => {

                            }}
                        //value={this.store.phone}
                        />
                        <Button title={'确定'}
                            style={styles.buttonStyle}
                            titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                            onPress={() => this.onRegisterPress()}
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
    cardBox: {
        backgroundColor: '#5CB4EC',
        width: SCREEN_WIDTH - px2dp(80),
        height: SCREEN_HEIGHT / 5,
        borderRadius: px2dp(20),
        marginVertical: px2dp(20)
    },
    bankName: {
        marginTop: px2dp(40),
        marginHorizontal: px2dp(60),
        fontSize: FONT_SIZE(16),
        color: '#fff',
    },
    cardType: {
        marginTop: px2dp(20),
        marginHorizontal: px2dp(60),
        fontSize: FONT_SIZE(14),
        color: '#fff',
    },
    cardNo: {
        alignSelf: 'flex-end',
        marginTop: px2dp(20),
        marginHorizontal: px2dp(50),
        fontSize: FONT_SIZE(16),
        color: '#fff',
    },
    formStyle: {
        alignItems: 'center',
        marginTop: px2dp(10),
    },
    buttonStyle: {
        width: SCREEN_WIDTH - px2dp(180),
        height: px2dp(80),
        marginTop: px2dp(40),
        marginBottom: px2dp(20),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20,
        alignSelf: "center"
    },
});