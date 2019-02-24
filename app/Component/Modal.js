/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-07-27 09:43:39 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 09:59:43
 * @Description: modal提示框
 */

import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    Switch,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { Button, NavigationBar, Input, Select, Overlay, Label } from 'teaset';
import Alert from "./Alert";
export default class SpdModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'slide',
            modalVisible: true,
            transparent: true
        };
    }

    _setModalVisible(visible) {
        this.props.onModalVisible(visible)
        this.setState({modalVisible: visible});
    }

    _onSubmit() {
        this._setModalVisible(false)
        this.props.onSubmit()
    }

    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff' }
            : null;

        return (
            <View>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this._setModalVisible(false)}}
                    >
                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                            {this.props.type === 'alert' ? 
                                <Alert
                                    title={'提示'}
                                    detailText={this.props.msg}
                                    contentView={this.props.contentView}
                                    type={this.props.type}
                                    onConfirm={() => {this._onSubmit()}}
                                    onCancel={() => { this._setModalVisible(false)}} />
                            : 
                            <View style={styles.contentWrap}>
                                <Label style={styles.title}>{this.props.title}</Label>  
                                <View style={styles.inputViewStyle}>
                                    {this.props.contentView}
                                </View>
                                <View style={styles.modalButtonWrap}>
                                    <Button
                                        title={'确定'}
                                        disabled={this.props.btnDisabled || false}
                                        style={styles.modalButton}
                                        titleStyle={{ fontSize: FONT_SIZE(14), color: Color.primary }}
                                        onPress={() => this._onSubmit()}
                                    />
                                    <Button
                                        title={'取消'}
                                        style={styles.modalButton}
                                        titleStyle={{ fontSize: FONT_SIZE(14), color: Color.primary }}
                                        onPress={() => this._setModalVisible(false)}
                                    />
                                </View>
                            </View>}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    innerContainer: {
        borderRadius: 10,
    },
    contentWrap: {
        minHeight: SCREEN_WIDTH * 0.16,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.8,
        paddingVertical: px2dp(20),
        backgroundColor: '#fff',
    },
    title: {
        fontSize: FONT_SIZE(14), 
        color: Color.primary
    },
    modalButtonWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: px2dp(20),
    },
    modalButton: {
        flex: 1,
        marginTop: 10,
        borderColor: Color.primary,
        borderRadius: 5,
        marginLeft: px2dp(30),
        marginRight: px2dp(30)
    },
    inputViewStyle: {
        height: px2dp(88),
        marginTop: px2dp(20),
        borderColor: '#d1d1d1',
        borderWidth: px2dp(1),
        borderRadius: 5,
        height: SCREEN_HEIGHT * 0.3,
        width: SCREEN_WIDTH * 0.8 - px2dp(100),
    },
});