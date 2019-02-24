/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-15 15:16:36 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-09 09:29:18
 * @Description: 订单详情  <Order Order={this.props.order}/>
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import Modal from '../../Component/Modal';
import { Button, NavigationBar, Input, Select, Overlay, Label, ModalIndicator } from 'teaset';
import Order from '../../Component/Order';
import UploadImg from '../../Component/UploadImg';

import { observer, inject } from 'mobx-react/native';


@inject(["orderStore"],["userStore"],["locationStore"]) // 注入对应的store
@observer
export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.locationStore = this.props.locationStore;
        this.userStore = this.props.userStore;
        this.store = this.props.orderStore; //通过props来导入访问已注入的store
        console.log(this.props.order);
        this.store.orderDetail=this.props.order;
        this.lng = Number.parseFloat(this.props.order.consigneelng);
        this.lat = Number.parseFloat(this.props.order.consigneelat);
        //this.locationStore.getDistanceLocal(this.lat, this.lng);//初始化签收状态
        this.locationStore.getDistance(this.lat, this.lng);
        this.state = {
            modalVisible: false,
            footerVisble: true,
            signDistance: 0, 
            btnDisabled: true,
            text: '', // temporary store the input text
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        //console.log(this.locationStore.distance);
        //console.log(this.locationStore.isSign);
        //this.locationStore.getDistance(this.lat, this.lng)
        //     .then(()=>{
        //         console.log(this.locationStore.distance);
        //         console.log(this.locationStore.isSign);
                
        //     })
        //console.log(this.locationStore.getDistanceLocal(this.lat, this.lng));
    }

    feedback() {
        this.store.type='0';
        this.setModalVisible(true);

    }

    finish(order) {
        Actions.Receipt({
            headerTitle: '订单签收',
            order
        });
       // Actions.Receipt();
        //this.setModalVisible(true)Y1807265406795
    }

    setSubmit() {
        let cause = iOS ? this.state.text : this.state.cause;
        this.store.signTransport(this.locationStore.location, cause).then(() => {
            hideLoading();
            //异常反馈后刷新数据
            //Actions.push('Task', { orderPage: this.store.orderLists.length === 1 ? 2 : 1 });
            Actions.Task({ orderPage: this.store.orderLists.length === 0 ? 2 : 1 });
        }).catch(() => {
            hideLoading();
        })
        //{userId: "59728", orderNo: "", pageSize: 10, pageIndex: 1, status: "1"}
    }
    _setFooterVisble(visible) {
        this.setState({footerVisble:visible})
    }
    _getImgList(imgList) {
        console.log(imgList)
    }
    renderContent() {
        return (
            <Input placeholder={'请输入异常原因'}
                style={styles.inputStyle}
                onChangeText={(text) => {
                    if(iOS) {
                        this.setState({ text: text });
                    } else {
                        this.setState({ cause: text });
                    }
                   
                    if (text) {
                        this.setState({
                            btnDisabled: false
                        })
                    } else {
                        this.setState({
                            btnDisabled: true
                        })
                    }
                }}
                multiline={true}
                autoCapitalize='none'
                clearButtonMode={'always'}
                onSubmitEditing={Keyboard.dismiss}
                onBlur={iOS ? (text) => { this.setState({ cause: this.state.text });} : null}
            >
                <Text>{this.state.cause}</Text>
            </Input>
        )
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
                <View style={{ backgroundColor: 'white', flex: 1, marginTop: px2dp(128) }}>
                    <Order order={this.props.order} location={this.locationStore} feedback={() => this.feedback()} finish={() => this.finish(this.props.order)}/>
                </View>
                {this.state.modalVisible?<Modal height={px2dp(400)}
                    contentView={this.renderContent()}
                    title='异常登记'
                    btnDisabled = {this.state.btnDisabled}
                    onModalVisible={(visible) => { this.setModalVisible(visible) }}
                    onRequestClose={() => {console.log("Modal has been closed.")}}
                    onSubmit={() => {this.setSubmit()}}/> :null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    cellStyle: {
        width: SCREEN_WIDTH - px2dp(180),
        backgroundColor: '#fff',
        marginTop: px2dp(40),
        marginBottom: px2dp(30),
        height: px2dp(80),
        borderRadius: 10,
        borderColor: "#d1d1d1",
        borderWidth: px2dp(1),
    },
    cellStyleSelected: {
        width: SCREEN_WIDTH - px2dp(180),
        backgroundColor: Color.primary,
        marginTop: px2dp(40),
        marginBottom: px2dp(30),
        height: px2dp(80),
        borderRadius: 10
    },
    cellTextStyle: {
        color: "#ec9235",
        fontSize: FONT_SIZE(14),
        textAlign: 'center',
        lineHeight: px2dp(80),
    },
    cellTextStyleSelected: {
        color: "#fff",
        fontSize: FONT_SIZE(14),
        textAlign: 'center',
        lineHeight: px2dp(80),
    },
    inputStyle: {
        borderColor: 'transparent',
        borderRadius: 0,
        textAlignVertical: 'top',
        backgroundColor: 'transparent',
        flex: 1,
    },
});