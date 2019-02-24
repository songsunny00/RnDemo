/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-02 11:26:12
 * @Description: 侧边栏设置 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Button, NavigationBar, ListRow } from 'teaset';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        console.log(this.store.serverUrl);
        this.state = {
            //serverUrlList:  Config.serverUrlList
        };
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
                    <ListRow title='帮助中心'
                        bottomSeparator='full'
                        //*tag1 onPress={() => Actions.Help({ headerTitle: '帮助中心' })}
                        />
                    <ListRow title='意见反馈'
                        bottomSeparator='full'
                         //*tag1 onPress={() => Actions.Feedback({ headerTitle: '意见反馈' })}
                        />
                    <ListRow title='关于我们'
                        bottomSeparator='full'
                        onPress={() => Actions.About({ headerTitle: '关于我们' })} />
                    <Button
                        title={'安全退出'}
                        style={styles.btnStyle}
                        titleStyle={{ fontSize: FONT_SIZE(12), color: '#E51C23' }}
                        onPress={() => {
                            this.store.logout();
                            Actions.LoginModal();
                        }
                    }/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F6F8',
    },
    btnStyle: {
        height: px2dp(80),
        marginVertical: px2dp(60),
       //backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 0,
    },
});