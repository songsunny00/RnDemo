/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 09:43:10 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-06-18 14:50:44
 * @Description: 步骤指示器 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import StepIndicator from 'react-native-step-indicator';

const Steps = (props) => {
    return (
        <View style={props.style}>
            <StepIndicator
                stepCount={props.stepCount}
                renderStepIndicator={props.renderStepIndicator}
                customStyles={props.customStyles}
                currentPosition={props.currentPosition}
                labels={props.labels} />
        </View>
    )
}

export default Steps;
