/**
 * Created by Rabbit on 2017/5/11.
 */
import React, { Component } from 'react';
import {Platform, ActivityIndicator} from 'react-native';


import localStorage from 'react-native-simple-store';
import CryptoJS from 'crypto-js';


// 设计图上的比例，宽度
let basePx = Platform.OS === 'ios' ? 750 : 720;

px2dp = (px: number): number => {
    return px / basePx * SCREEN_WIDTH;
}

getmd5 = (str, flag=false) => {
    let strnew = CryptoJS.MD5(str).toString();
    return flag ? strnew.substr(8, 16) : strnew;
}

isLogin = () => {
    //localStorage.delete('baseInfo');
    return localStorage.get('baseInfo').then((val) => {
        //console.log(val);
        //console.log(val.userId);
        if (val.userId) {
            // console.log('true');
            // global.TOKEN = true;
            // global.baseInfo = val;
            return true;
        } else {
            // console.log('false');
            // global.TOKEN = false;
            // global.baseInfo = null;
            return false;
        }
    });
}

//加载loading
let customKey = null;
showLoading = (text) => {
   if (customKey) return;
    customKey = Toast.show({
      text: text?text:'正在加载...',
      icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
      position: 'center',
      duration: 1000000,
    });

}
hideLoading = (text) => {
   if (!customKey) return;
    Toast.hide(customKey);
    customKey = null;
}

//时间格式处理
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

formatTime = (date ,flag = false) => {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    let substr = ' ';
    if(flag) substr='';
    return [year, month, day].map(formatNumber).join('-') + substr + [hour, minute, second].map(formatNumber).join(':')

}

//版本比较
/*测试用例
// v1     v2    （结果)
"2.2.3"  "2.2.4.16" (-1)
"2.2"    "2.2.5.6"  (-1)
"2.2a"   "2.2.3"    (-1)
"0.1.1a" "0.1.1"    (-1)
"matlab r2014a"  "matlab r2014b"  (-1)
"MATLAB R2007b"  "MATLAB R2016a"  (-1)
"3.1.1b" "3.1.1rc"   (1)
"2.1.6"  "2.1.6b"    (1)
"2.1.6b" "2.1.6b2"   (-1)
"2.1.6b2" "2.1.6b2"  (0)
*/
versionCompare = (v1, v2) => { //v1比较新时返回1,v1和v2相同是返回0,v2比较新时返回-1;
    var arr1 = v1.toLowerCase().split('.');
    var arr2 = v2.toLowerCase().split('.');
    var len1 = arr1.length;
    var len2 = arr2.length;

    while (len1 > len2) {
        arr2.push(0);
        ++len2;
    }
    while (len1 < len2) {
        arr1.push(0);
        ++len1;
    }

    if (arr1[0].indexOf("matlab") != -1 && arr2[0].indexOf("matlab") != -1) {  //类似MATLAB的情况
        arr1 = arr1[0].split('');
        arr2 = arr2[0].split('');
        for (var n = 8; n < arr1.length; n++) {
            if (n == arr1.length - 1) {
                return arr1[arr1.length - 1] == "a" ? "-1" : "1";
            } else if (arr1[n] != arr2[n]) {
                return arr1[n] > arr2[n] ? "1" : "-1";
            }
        }
    }
    //将例如 [2,1,2a] => [2,1,2,a]
    if (isNaN(arr1[len1 - 1])) { arr1 = splitString(arr1); }
    if (isNaN(arr2[len2 - 1])) { arr2 = splitString(arr2); }
    len1 = arr1.length;
    len2 = arr2.length;

    for (var i = 0; i < (len1 > len2 ? len1 : len2); i++) {
        if (arr1[i] != arr2[i]) {
            if (typeof (arr1[i] && arr2[i]) == "undefined" && (!isNaN(arr1[i]) || !isNaN(arr2[i]))) {
                //两个数组的对应位是数字和undefined
                return typeof (arr1[i]) == "undefined" ? "-1" : "1";
            } else if (typeof (arr1[i] && arr2[i]) == "undefined" && isNaN(arr1[i]) && isNaN(arr2[i])) {
                //两个数组的对应位是字母和undefined
                return (typeof (arr1[i]) == "undefined") ? "1" : "-1";
            } else if (!isNaN(arr1[i]) && !isNaN(arr2[i])) {
                //两个数组的对应位都是数字
                return parseInt(arr1[i]) > parseInt(arr2[i]) ? "1" : "-1";
            } else if (isNaN(arr1[i]) && isNaN(arr2[i])) {
                //两个数组的对应位是字母
                var obj = { a: 0, b: 2, rc: 3 };  //考虑到“alpha”、“beta”和“releasecandidate”版本
                arr1[i] = obj[arr1[i]];
                arr2[i] = obj[arr2[i]];
                return arr1[i] > arr2[i] ? "1" : "-1";
            } else {    //两个数组的对应位是字母和数字
                return isNaN(arr1[i]) ? "-1" : "1";
            }
        } else if (len1 == len2 && i == len1 - 1) {
            //两个版本号相同
            return "0";
        }
    }
}

splitString = (arr) => {
    //将版本号数组最后一位的数字和字母分开  [2,2,16b2] => [2,2,16,b,2]
    var item = arr.splice(arr.length - 1, 1);
    var letter = item.toString().replace(/[^a-z]+/ig, "");
    var number = item.toString().replace(/[^0-9]+/ig, ",").split(',');
    arr.push(number.shift(), letter);
    if (number && number[0].length != 0) {
        arr.push(number.shift());
    }
    return arr;
}

module.exports = {
    px2dp,
    getmd5,
    isLogin,
    showLoading,
    hideLoading,
    versionCompare,
    formatTime
};