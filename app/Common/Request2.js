/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 网络请求
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-11 13:35:47
 * @LastEditTime: 2019-02-25 16:54:40
 */

'use strict';
import RNFetchBlob from 'react-native-fetch-blob';
import localStorage from 'react-native-simple-store';
import store from "../Store";
import Config from './Config';

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

// 处理url
const encodeQuery = (url, params = {}) => {
    let _url = url;
    if (!params || !Object.keys(params).length) {
        return _url
    };

    _url = _url.indexOf("?") === -1 ? `${_url}?` : `${_url}&`;

    const query = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join("&");

    return `${_url}${query}`;
};

// 处理错误请求
const throwError = (status) => {
    const error = new Error()
    error.message = '请求服务失败!状态为:' + status;
    error.status = status;
    throw error;
};


const checkStatus = (resp) => {
    if (resp.respInfo.status === 200) {
        return resp.json();
    } else {
        throwError(resp.respInfo.status);
    };
    //return json;
};

const Request = {
    // 框架可以用过cancel 取消某个网络请求
    /**
     * 设置Header请求头
     */
    header: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
    },
    /**
     * Config参数
     */
    config: {
        // 指示器,iOS专属
        // indicator:true,
        // 超时
        // timeout:3000
        // 缓存
        // fileCache : bool,
        // 缓存地址
        // path : string,
        // appendExt : string,
        // session : string,
        // addAndroidDownloads : any,
    },

    /**
     *
     * @param method            请求方式GET, POST, PUT, DELETE
     * @param url               请求网址
     * @param params            请求参数
     * @param config            网络配置文件
     * @param header            请求头
     * @returns {Promise.<TResult>}
     *
     */
    fetch: async ({
        method,
        url,
        params = {},
        config = {},
        header = {}
    }) => {
        let _method;
        let _params;
        let _url = url;
        let _config = {
            indicator: true,
            timeout: 10000, //超时设置时间10s
            ...config
        };
        let sign = handleSign(params);
        let token = store.userStore['token'];
        let userId = store.userStore['userId'];

        let _header = {
            'TOKEN': token,
            'platform': Android ? 'Android' : 'IOS',
            'masterId': userId,
            'sign': sign,
            'version': '1.3',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            ...header
        };
        //百度鹰眼服务 或者是登录
        if (_url.indexOf('login') >= 0 ) {
            _header = {
                'platform': Android ? 'Android' : 'IOS',
                'version': '1.3',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                ...header
            };
        }

        if (_url.indexOf('yingyan') >= 0) {
            _header = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                ...header
            };
            params = {
                'sn': sign,
                ...params
            }

            console.log('params:', params);
        }

        if (!method) _method = 'GET';
        else _method = method.toUpperCase();

        _params = encodeParam(params)

        if (__DEV__) {
            console.log('_url:', _url);
            // console.log('_config:', _config);
            // console.log('_method:', _method);
            // console.log('_header:', _header);
            // console.log('_params:', _params);
        }

        return RNFetchBlob
            .config(_config)
            .fetch(_method, _url, _header, _params)
            .then(resp => {
                return checkStatus(resp);
            })
            .then((res) => {
                console.log(res);
                //新模式服务
                if (res.returnCode !== 200 && res.returnCode !== '200' 
                    && !res.msgCode && res.status !== 0) { //鹰眼服务成功 status=0
                    if (res.info) Toast.fail(res.info);
                    
                    if (res.returnCode === 401 || res.returnCode === '401') {
                        //setTimeout(function() {
                            localStorage.delete('baseInfo');
                            Actions.reset('loading'); //退出后重新清空导航堆栈
                        //}, 1000)
                    }
                    return false;
                } 
                return res;
            })
            .catch((error) => {
                //console.log(error);
                Toast.fail(error.message);
                //throw error;
            })
    },

    /**
     *
     * @param url       请求网址
     * @param params    参数
     * @param header    请求头
     * @param config    fetchblob配置
     * @returns
     *
     */
    get: (url, params = {}, header = {}, config = {}) => {

        return RTRequest.fetch({
                method: 'get',
                url,
                params,
                header,
                config
            })
            .then((data) => {
                // console.log(data);
                return data;
            })
            .catch((error) => {
                // console.log(error.msg);
                throw error;
            })
    },

    post: (url, params = {}, header = {}, config = {}) => {

        return RTRequest.fetch({
                method: 'post',
                url,
                params,
                header,
                config
            })
            .then((data) => {
                // console.log(data);
                return data;
            })
            .catch((error) => {
                // console.log(error.msg);
                throw error;
            })
    },
    /**
     * @param url               请求网址
     * @param body              要上传的信息,会自动转码
     * @param uploadProgress    上传进度
     * @param successCallBack   返回正确的值
     * @param failCallBack      返回错误的值
     * @returns
     *
     */
    upload:(url,obj,progressCallBack, successCallBack, failCallBack) => {
    
        RNFetchBlob.fetch('POST', url, {
            // Authorization : "Bearer access-token",
            // otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
            'masterId':store.userStore['userId'],
            'token':store.userStore['token']

        },[{name : 'app-'+new Date().getTime()+'-'+obj.typeNo, filename : obj.path, type:obj.mime, data: RNFetchBlob.wrap(obj.path)}])
        .uploadProgress((written, total) => {
            //console.log('uploaded', written / total)
        })
        // listen to download progress event
        .progress((received, total) => {
            //console.log('progress', received / total)
            progressCallBack(received / total);
        })
        .then((resp) => {
            successCallBack(resp);
        }).catch((err) => {
            failCallBack(err)
        })
        }
    };

export default Request;