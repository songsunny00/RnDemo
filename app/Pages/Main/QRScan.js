/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-07-05 15:31:25 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-28 14:49:22
 * @Description: 二维码扫描 
 */
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    Animated,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { NavigationBar, Input, Label } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRScannerView from '../../Component/QRScanner';
import { RNCamera } from 'react-native-camera';
import Sound from 'react-native-sound';

const { off, torch } = RNCamera.Constants.FlashMode;

export default class QRView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            torchOn: false,
        }
    }

    _switchTorch() {
        let newFlashMode;
       
        if (this.state.torchOn === false) {
            torchOn = true;
        } else {
            torchOn = false;
        }

        this.setState({
            torchOn: torchOn,
        });
    }

    _renderTitleBar() {
        return (
            <View style={styles.toolbar}>
                <TouchableOpacity
                    activeOpacity={0.5}//点击时的透明度
                    style={styles.btnBox}
                    onPress={() => Actions.pop()}>
                    <Icon name="chevron-left" size={35} color="#fff"/>
                    <Label style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', fontSize: FONT_SIZE(14), padding: px2dp(12) }}>{this.props.headerTitle}</Label>
                </TouchableOpacity>
            {/*
                <TouchableOpacity
                    activeOpacity={0.5}//点击时的透明度
                    style={styles.btnBox}
                    onPress={() => this._switchTorch}>
                    <Icon name="flashlight" size={25} color={
                        this.state.torchOn  ? "#FFD900" : "#fff"
                    } />
                </TouchableOpacity>
            */}
            </View>
        );
    }

    _renderMenu() {
        return (
            <View style={{margin:0}}>
                <TouchableOpacity
                    activeOpacity={0.5}//点击时的透明度
                    onPress={() => Actions.MyQR({ headerTitle: '我的二维码' })}
                    >
                    <Text
                        style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', fontSize: FONT_SIZE(16), padding:px2dp(12)}}
                    
                    >我的二维码</Text>
                </TouchableOpacity>
            </View>
        )
    }

    barcodeReceived(e) {
        console.log(e);
        sound = new Sound(require('./../../Resources/mp3/scan.mp3'), error => {
            if (error) {
                Toast.fail('error', error.message);
                return;
            }
    
            sound.play(() => {
                sound.release();
                console.log(e.data)
                Actions.Search({
                    headerTitle: '搜索',
                    searchWord:e.data
                });
                //Toast.message('children: Type: ' + e.type + '\nData: ' + e.data);
                //alert('children: Type: ' + e.type + '\nData: ' + e.data);
                
            });
        });
       
    }

    render() {
        return (
            <View style={styles.container}>
                <QRScannerView
                    bottomMenuStyle={{ height: 90, backgroundColor: '#0000008D', opacity: 1 }}
                    scanBarImage={Images.ScanBar}
                    cornerColor={"#FFD900"}
                    iscorneroffset={false}
                    scanBarAnimateTime={3000}
                    cornerOffsetSize={0}
                    borderWidth={1}
                    borderColor={"#FFD900"}
                    hintText={'请对准运输单上的二维码或者条码'}
                    hintTextPosition={80}
                    hintTextStyle={{ color: "#FFD900", fontSize: FONT_SIZE(14), fontWeight: 'bold' }}
                    maskColor={"#0000008D"}
                    bottomMenuHeight={90}
                    onScanResultReceived={this.barcodeReceived.bind(this)}
                    flashMode={this.state.torchOn ? torch : off}
                    renderTopBarView={() => this._renderTitleBar()}
                    renderBottomMenuView={() => this._renderMenu()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        //position: 'absolute',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: px2dp(10),
        marginTop: px2dp(30),
        top: px2dp(30),
        backgroundColor: "transparent",
        width: SCREEN_WIDTH
    },
    btnBox: {
        //width: px2dp(120),
        height: px2dp(80),
        //borderRadius: 20,
        //backgroundColor: '#000000B3',
        backgroundColor: "transparent",
        alignItems: 'center',
        margin: px2dp(10),
        flexDirection: "row",
    },
})