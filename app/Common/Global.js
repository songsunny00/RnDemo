/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 全局变量
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-11 13:35:47
 * @LastEditTime: 2019-03-06 10:51:10
 */

import React, { Component } from 'react';
import { Dimensions, PixelRatio, Platform, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// 设备信息
const device = {};
device.UniqueID = DeviceInfo.getUniqueID();
device.AppName = DeviceInfo.getApplicationName();
device.UserAgent = DeviceInfo.getUserAgent();
device.DeviceBrand = DeviceInfo.getBrand();
device.DeviceModel = DeviceInfo.getModel();
device.SystemVersion = Platform.OS + "/" + DeviceInfo.getSystemVersion();
device.Platform = Platform.OS;
device.AppVersion = DeviceInfo.getVersion();
device.BundleId = DeviceInfo.getBundleId();
device.Carrier = DeviceInfo.getCarrier(); //网络运营商
device.DeviceId = DeviceInfo.getDeviceId();
global.device = device;// 设备信息
// 通过系统API获得屏幕宽高
let { height, width } = Dimensions.get('window');
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio.get();
//console.log(device);

// 本地存储
import localStorage from './Storage';
// 配置文件，可以放网络请求等
import Config from './Config';
//接口
import Api from './Api';
// 项目中的图片可以通过Images.xxx 获取
import { Images } from '../Resources/index';
// 统一管理项目中的路由
import { Actions } from "react-native-router-flux";
//样式
import Theme from './SetTheme'
import {Color} from './MyStyle'
// 处理安卓，iOS字体不同的类，使用方法 fontSize:FONT_SIZE(20)
import FontSize from './FontSize';
// 处理安卓，iOS宽高的区别，使用方法 width:px2dp(20)
import { px2dp, isLogin, getmd5, showLoading, hideLoading, formatTime } from './Tool';
// antd-mobile-rn
import { Toast } from 'antd-mobile-rn';
// 基于react-native-fetch-blob封装的网络请求
import RTRequest from './Request';

/**
 * 常用页面逻辑处理方法
*/
// 适配字体
global.FONT_SIZE = FontSize;
// 屏幕适配
global.px2dp = px2dp;
// 配置
global.Config = Config;
// router跳转的方法
global.Actions = Actions;
// 样式-颜色
global.Theme = Theme;
global.Color = Color;
// 图片加载
global.Images = Images;
// 弹出框
global.Alert = Alert;
// 本地存储
global.localStorage = localStorage;
// 弹框Toast
global.Toast = Toast;
// 加载
global.showLoading = showLoading;
global.hideLoading = hideLoading;
// 网络请求
global.RTRequest = RTRequest;
// 接口
global.Api = Api;

/**
 * 常用业务逻辑处理方法
*/
//时间格式处理
global.formatTime = formatTime;
// 加密
global.getmd5 = getmd5;
// 判断登录
global.isLogin = isLogin;


