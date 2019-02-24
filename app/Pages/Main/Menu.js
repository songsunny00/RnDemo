/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:24:45 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-09 09:46:10
 * @Description: 主页菜单 
 */


import React, {Component} from'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { Button, Label, ListRow } from 'teaset';
import { observer, inject } from 'mobx-react/native';
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
import MenuRow from '../../Component/MenuRow';

@inject(["userStore"],["socketStore"]) // 注入对应的store
@observer
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
        this.socketStore = this.props.socketStore;
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={Images.MenuBg}
                    resizeMode='cover'
                    style={styles.bannerImageStyle}
                >
                    <View style={styles.avatarWrap}>
                        <Image
                            source={Images.Avatar}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.avatarTextWrap}>
                        <Label style={styles.avatarText}>{this.store.userName}</Label>
                        <Label style={styles.avatarText}>{this.store.phone}</Label>
                    </View>
                </ImageBackground>
                <View style={styles.contentStyle}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { Actions.Profile({ headerTitle: '个人资料' })}}
                    >
                        <View style={styles.accountLineStyle}>
                            <View style={styles.accountLineLeftStyle}>
                                <Icon size={25} name='account-card-details' style={styles.accountIcon}></Icon>
                                <Label style={styles.accountText}>个人信息</Label>
                            </View>
                            <View style={styles.accountLineMidStyle} />
                            {
                                this.store.isPhotoVerify === true || this.store.isVehicleVerify || this.store.isVerify
                                ?
                                <View style={styles.accountLineRightStyle}>
                                    <Label style={styles.infoText}>资料未审核</Label>
                                    <Icon size={25} name='emoticon-sad' style={styles.infoIcon}></Icon>
                                </View>
                                : null
                            }
                        </View>
                    </TouchableOpacity>
                    <MenuRow title="司机等级" icon="star-circle" color="#EA9518" />
                    {/*tag1
                    <MenuRow title="银行卡" icon="credit-card" 
                        color="#EA9518" 
                        onPress={() => Actions.Card({ headerTitle: '我的银行卡' })} />
                    <View style={{marginTop: px2dp(20)}} />
                    <MenuRow title="历史任务" icon="history" color="#1296DB" 
                        onPress={() => Actions.HistoryTask({ headerTitle: '历史任务' })} />
                    <MenuRow title="我的收入" icon="chart-bar" 
                        color="#1296DB"
                        onPress={() => Actions.Income({ headerTitle: '我的收入' })} />
                    <MenuRow title="修改密码" icon="lock-open"  
                        color="#1296DB"
                        onPress={() => Actions.ModifyPwd({ headerTitle: '修改密码' })} />
                    */}
                    <View style={{ marginTop: px2dp(20) }} />
                    <MenuRow title="GPS上传" icon="crosshairs-gps" rightText={this.socketStore.socketReturnText}
                        color="#1296DB" 
                    />
                     
                    <MenuRow title="设置" icon="settings" 
                        color="#1296DB" 
                        onPress={() => Actions.Setting({ headerTitle: '设置' })} />
                    
                </View>
                <View style={styles.versionWrapStyle}>
                    <Text style={styles.versionText}>
                        {this.store.enviroment != '外网生产' ?
                            this.store.enviroment
                            : ''
                        }
                        版本号:{device.AppVersion}
                    </Text>
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
    bannerImageStyle: {
        height: px2dp(320),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contentStyle: {
        flex: 1,
    },
    accountLineStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: px2dp(120),
        marginBottom: px2dp(20),
    },
    accountLineLeftStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px2dp(10),
        marginRight: px2dp(20)
    },
    accountLineMidStyle: {
        height: px2dp(40),
        width: px2dp(2),
        backgroundColor: '#d1d1d1',
    },
    accountLineRightStyle: {
        flexDirection: 'row',
        marginLeft: px2dp(30)
    },
    versionWrapStyle: {
        height: px2dp(80),
        backgroundColor: Color.primary,
        bottom: 0
    },
    accountText: {
        fontSize: FONT_SIZE(10),
        lineHeight: px2dp(40),
        textAlign: 'center',
        color: "#000",
    },
    infoText: {
        fontSize: FONT_SIZE(12),
        lineHeight: px2dp(50),
        textAlign: 'center',
        color: "#E51C23",
    },
    accountIcon: {
        color: "#FF9800",
    },
    infoIcon: {
        color: "#E51C23",
        marginBottom: px2dp(10)
    },
    avatarWrap: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: px2dp(170),
        height: px2dp(170),
        borderRadius: px2dp(85),
        backgroundColor: Theme.transparentColor,
    },
    avatarTextWrap: {
        flex: 3,
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: FONT_SIZE(14), 
        color: '#fff',
        marginVertical: px2dp(10)
    },
    versionText: {
        fontSize: FONT_SIZE(14), 
        color: '#fff',
        lineHeight: px2dp(80),
        textAlign: 'center'
    }
});