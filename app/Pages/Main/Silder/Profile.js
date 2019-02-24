/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 16:36:32 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-04 22:53:00
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

import { Button, NavigationBar, Input, Label, ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { observer, inject } from 'mobx-react/native';

@inject(["userStore"]) // 注入对应的store
@observer
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.userStore; //通过props来导入访问已注入的store
    }

    componentDidMount() {
        //this.store.getConfig();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.headerTitle}
                    type='ios'
                    style={{ height: px2dp(128), backgroundColor: Color.primary,}}
                    statusBarStyle='default'

                    leftView={
                        <NavigationBar.BackButton title='返回' onPress={() => Actions.pop()} />
                    }
                />
                <View style={{ backgroundColor: 'white', marginTop: px2dp(128) }}>
                    <View style={styles.avatarWrap}>
                        <Image
                            source={Images.Avatar}
                            style={styles.avatar}
                        />
                        <Label style={styles.avatarText}>{this.store.userName}</Label>
                        <Label style={styles.avatarText}>{this.store.phone}</Label>
                    </View>
                    <ListRow title='我的二维码' icon={<Icon size={20} name='qrcode' style={styles.rowIcon} />} 
                        topSeparator='full' bottomSeparator='full'
                        onPress={() => Actions.MyQR({ headerTitle: '我的二维码' })}/> 
                    <View>
                    <ListRow title='个人信息' icon={<Icon size={20} name='account-card-details' style={styles.rowIcon} />}
                        bottomSeparator='full'
                        //*tag1 onPress={() => Actions.ShowPersonalInfo({ headerTitle: '个人信息' })} 
                        />
                        <Image
                            source={this.store.isVerify ? Images.Checked : Images.Unchecked}
                            style={styles.statusStyle}
                        />
                    </View>
                    <View>
                        <ListRow title='车辆信息' icon={<Icon size={20} name='truck' style={styles.rowIcon} />}
                        bottomSeparator='full'
                        //*tag1 onPress={() => Actions.ShowTruckInfo({ headerTitle: '车辆信息' })} 
                        />
                        <Image
                            source={this.store.isVehicleVerify ? Images.Checked : Images.Unchecked}
                            style={styles.statusStyle}
                        />
                    </View>
                    <View>   
                        <ListRow title='照片信息' icon={<Icon size={20} name='image' style={styles.rowIcon} />}
                            bottomSeparator='full'
                            //*tag1 onPress={() => Actions.ShowPicInfo({ headerTitle: '照片信息' })} 
                            />
                        <Image
                            source={this.store.isPhotoVerify ? Images.checked : Images.Unchecked}
                            style={styles.statusStyle}
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
        backgroundColor: '#F1F6F8',
    },
    avatarWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(30),
    },
    avatar: {
        width: px2dp(170),
        height: px2dp(170),
        borderRadius: px2dp(85),
        backgroundColor: Theme.transparentColor,
    },
    avatarText: {
        fontSize: FONT_SIZE(14),
        marginVertical: px2dp(10)
    },
    rowIcon: {
        marginLeft: px2dp(20),
        marginRight: px2dp(10),
    },
    statusStyle: {
        width: px2dp(125),
        height: px2dp(50),
        position: "absolute",
        right: px2dp(70),
        bottom: px2dp(20),
        backgroundColor: Theme.transparentColor,
    }
});