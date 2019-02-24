/**
 * Created by xizhixin on 2017/5/3.
 */

import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import {
    requireNativeComponent,
    NativeModules,
    Platform,
    DeviceEventEmitter
} from 'react-native';

const _module = NativeModules.BaiduGetDistanceModule;
export default {
    getDistance(lat1, lng1, lat2, lng2){
        return new Promise((resolve, reject) => {
            try {
                _module.getDistance(lat1, lng1, lat2, lng2);
            }
            catch (e) {
                reject(e);
                return;
            }
            DeviceEventEmitter.once('getDistanceResult', resp => {
                resp.distance = parseFloat(resp.distance);
                resolve(resp);
            });
        });
    },
}