/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 15:23:15 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-01 10:07:33
 * @Description: 密码输入框 
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Input } from 'teaset';
import PropTypes from 'prop-types';
import Images from './../Resources/Images';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PwdInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPwd: false,
        };
    }

    static propTypes = {
        //图片资源
        ...Input.props,
        closeImg: PropTypes.object,
        openImg: PropTypes.object,
    }


    render() {
        let props = Object.assign({}, this.props);
        let pwdImg = !this.state.showPwd ? Images.CloseEye : Images.OpenEye;
       
        return (
            <View style={style.containerStyle}>
                <Input
                    secureTextEntry={!this.state.showPwd}
                    {...props} />

                <TouchableOpacity
                    style={style.btnStyle}
                    onPress={() => {
                        this.setState({
                            showPwd: !this.state.showPwd,
                        });
                    }}>
                    <Image style={style.imageStyle} source={pwdImg} />
                </TouchableOpacity>
            </View>
        );
    }
}


const style = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        //padding:0,
        //backgroundColor: 'red',
        width: SCREEN_WIDTH - px2dp(280)
    },
    btnStyle: {
        position: 'absolute',
        top: px2dp(25),
        bottom: 0,
        right: px2dp(80),
        paddingLeft: px2dp(10)
    },
    imageStyle: {
        height: px2dp(30),
        width: px2dp(30),
    },

})