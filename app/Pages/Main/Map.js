/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-07-27 14:29:59 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-03 16:16:10
 * @Description: 地图显示 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import { Button, NavigationBar, Input, Label } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { observer, inject } from 'mobx-react/native';

@inject(["userStore"], ["locationStore"]) // 注入对应的store
@observer
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.userStore;
        this.order = this.props.order;

        this.longitude = Number.parseFloat(this.order.consigneelng);//保留五位小数
        this.latitude = Number.parseFloat(this.order.consigneelat);//保留五位小数

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: this.longitude, 
                latitude: this.latitude
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: this.longitude,
                latitude: this.latitude,
                title: this.order.address
            }]
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
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        zoomControlsVisible={false}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        marker={this.state.marker}
                        markers={this.state.markers}
                        style={styles.map}
                        onMarkerClick={(e) => {
                            //console.warn(JSON.stringify(e));
                        }}
                        onMapClick={(e) => {
                            //console.warn(JSON.stringify(e));
                        }}
                    >
                        <View>
                            <TouchableOpacity  style={styles.rowViewBox} onPress={() => {
                                Geolocation.getCurrentPosition()
                                    .then(data => {
                                        this.setState({
                                            zoom: 15,
                                            marker: {
                                                latitude: data.latitude,
                                                longitude: data.longitude,
                                                title: '我的位置'
                                            },
                                            center: {
                                                latitude: data.latitude,
                                                longitude: data.longitude,
                                                rand: Math.random()
                                            }
                                        });
                                    })
                                    .catch(e => {
                                        console.warn(e, 'error');
                                    })
                            }}>
                                <View style={styles.rowdataBox}>
                                    <Icon size={20} name='crosshairs-gps' style={{ color: '#000', marginTop: 4, }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rowViewBox} onPress={() => {
                                this.setState({
                                    zoom: 15,
                                    center: {
                                        latitude: this.latitude,
                                        longitude: this.longitude,
                                        rand: Math.random()
                                    }
                                });
                                }   
                            }>
                                <View style={styles.rowdataBox}>
                                    <Icon size={20} name='crosshairs-gps' style={{ color: '#000', marginTop: 4, }} />
                                    <Label style={styles.rowdatatextBox}>订单位置</Label>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </MapView>
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
    map: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - px2dp(128),
    },
    rowViewBox: {
        flexDirection: 'row',
        backgroundColor: "transparent",
    },
    rowdatatext: {
        color: 'gray',
        //width: width
    },
});