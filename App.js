/*
 * @Author: songsunny
 * @Date: 2019-02-11 13:35:36
 * @LastEditors: songsunny
 * @LastEditTime: 2019-02-11 14:33:25
 * @Description: 入口文件
 * @Github: https://github.com/songsunny00
 */

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