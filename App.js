/*
 * @Author: songsunny
 * @Date: 2019-02-11 13:35:36
 * @LastEditors: songsunny
 * @LastEditTime: 2019-02-24 13:01:01
 * @Description: 入口文件
 * @Github: https://github.com/songsunny00
 */
//ctrl+alt+i 生城头部信息快捷键

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Router from './app/Router';
import { Provider } from 'mobx-react/native';
import store from "./app/Store";

export default class App extends Component <{}> {
    render() {
        return ( 
            <Provider { ...store} >
                <Router />
            </Provider>
        );
  }
}