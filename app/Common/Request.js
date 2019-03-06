/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 网络请求
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-11 13:35:47
 * @LastEditTime: 2019-02-25 17:16:45
 */

'use strict';
import axios from 'axios'
import store from "../Store";
// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 45000 // 请求超时时间
})
function objKeySort(obj) { //排序的函数
    if (!obj) {
        return obj;
    }
    var newkey = Object.keys(obj).sort();　　 //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
}
const handleSign = (jsonobj) => {
    let data = objKeySort(jsonobj);
    let dataStr = '';
    for (let objName in data) {
        if (data[objName] instanceof Array) {
            let _obj = {
                arry: data[objName]
            }
            let _objStr = JSON.stringify(_obj);
            let _start = _objStr.indexOf('arry');
            let _end = _objStr.length - 1;
            data[objName] = _objStr.substring(_start + 6, _end);
        }
        if (data[objName] instanceof Object) {
            data[objName] = JSON.stringify(data[objName]);
        }
        dataStr += objName + '=' + data[objName] + '&';
    }
    let str = dataStr + 'key=' + store.userStore.token
    console.log(str)
    let sign = getmd5(str).toUpperCase();
    return sign;
}

const encodeParam = (jsonobj) => {
    let str = '';
    for (var name in jsonobj) {
        str += name + '=' + jsonobj[name] + '&'
    }
    return str
}
// request拦截器
service.interceptors.request.use(config => {
 
  let _data = config.data
  let sign = handleSign(_data);
  let token = store.userStore['token'];
  let userId = store.userStore['userId'];
  if (store.userStore.token) {
    config.headers['TOKEN'] = token;
    config.headers['masterId'] = userId;
    config.headers['platform'] = 'APP'
    config.headers['sign'] = sign
    config.headers['version'] = '1.3'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.returnCode !== 200 && res.returnCode !== '200' 
    && !res.msgCode && res.status !== 0) {
      if (res.info) Toast.fail(res.info);

      if (res.returnCode === 401 || res.returnCode === '401') {
        setTimeout(function() {
            localStorage.removeItem('token');
            Actions.reset('loading'); //退出后重新清空导航堆栈
        }, 1000)
      }
      return Promise.reject(res.info)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast({
      message: err.message,
      iconClass: 'fa fa-close',
      duration:3*1000
    });
    return Promise.reject(error)
  }
)

export default service