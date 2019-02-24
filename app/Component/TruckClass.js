/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 09:43:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-21 22:05:38
 * @Description: 选择车辆类别 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Wheel } from 'teaset';


export default class TruckClassView extends Component {
    constructor(props) {
        super(props);
        TruckClass = Config.TruckClass;
        TruckClassNames = TruckClass.map((item, index) => item.name);
        TruckClassLengths = TruckClass.map((item, index) => item.lengths);
        this.state = {
            TruckClassLength: TruckClassLengths[0],
            TruckClassLengthIndex: 0,
            name: TruckClassNames[0],
            length: TruckClassLengths[0][0]
        };
    }

    onTruckClassNameChange = (index) => {
        this.setState({
            TruckClassLength: TruckClassLengths[index],
            TruckClassLengthIndex: 0,
            name: TruckClassNames[index],    
        });
        //this.props.getTruckClass(this.state.name, this.state.length);
    }

    onTruckClassLengthChange = (index) => {
        this.setState({
            length: this.state.TruckClassLength[index],
        });
        this.props.getTruckClass(this.state.name, this.state.length);
    }

    render() {
        return (
            <View style={styles.warpStyle}>
                <Wheel
                    style={styles.wheelStyle}
                    itemStyle={{ textAlign: 'center' }}
                    items={TruckClassNames}
                    defaultIndex={0}
                    onChange={index => this.onTruckClassNameChange(index)}
                />
                <Wheel
                    style={styles.wheelStyle}
                    itemStyle={{ textAlign: 'center' }}
                    items={this.state.TruckClassLength}
                    defaultIndex={this.state.TruckClassLengthIndex}
                    onChange={index => this.onTruckClassLengthChange(index)}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    warpStyle: {
        backgroundColor: Theme.defaultColor, 
        padding: px2dp(20), 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    wheelStyle: {
        height: px2dp(200), 
        width: SCREEN_WIDTH - px2dp(440)
    }
});
