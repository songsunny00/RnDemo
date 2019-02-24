const Api = {
    getLocationDetail: (latlon) => {
        return new Promise((resolve, reject) => {
            RTRequest.post('http://sls.4006005656.com/wechat/getLocationDetail', latlon)
                .then((res) => {
                    if (res.data) resolve(res.data);
                    else reject()
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    login: (param, spdUrl) => {
        return new Promise((resolve, reject) => {
            RTRequest.post(spdUrl + 'app/user/storeLogin', param)
                .then((res) => {
                    if (res.data) resolve(res.data);
                    else reject()
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getList: (param, spdUrl) => {
        return new Promise((resolve, reject) => {
            RTRequest.post(spdUrl + 'newTms/dispatch/queryTransportOrder', param)
                .then((res) => {
                    if (res) resolve(res);
                    else reject()
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    //发车
    departConfirm: (param, spdUrl) => {
        return new Promise((resolve, reject) => {
            RTRequest.post(spdUrl + 'newTms/dispatch/departConfirm', param)
                .then((res) => {
                    if (res) resolve(res);
                    else reject()
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    //签收
    signTransport: (param, spdUrl) => {
        return new Promise((resolve, reject) => {
            RTRequest.post(spdUrl + 'newTms/dispatch/signTransport', param)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    //比较版本号升级
    /**
     * {
            "data": {
                "version":"1.1",
                "filename":"微信.apk",
                "url":"http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk",
                "desc":["更新了一些bug", "修复了一些UI问题"]
            },
            "error":{"code":0}
        }
        //原生返回
        返回示例 {
            "returnCode": 200,
            "info": "成功",
            "data": {
                "majorVersionNumber": 1,
                "minorVersionNumber": 0,
                "revisionNumber": 0,
                "fileUrl": "group1:M00/00/30/CkQarlti0keAWj_dAdtJlxH05Q8376.apk",
                "fileName": "app-release.apk",
                "upgradeFlag": 0,–强制更新标识 0 否 1 是
                "updateContent": "更新日志…",
                "version": "1.0.0",
                "releaseTime": "2018-03-12 18:24:56",
                "downloadUrl": "http://10.69.10.70/module-api/app/common/downloadApp",
                "androidUrl": "http://183.61.66.131/group1/M00/00/30/CkQarlti0keAWj_dAdtJlxH05Q8376.apk",
                "iosUrl": "https://itunes.apple.com/cn/app/%E5%90%8C%E5%9F%8E%E9%85%8D/id1300013507?mt=8",
                "appType": “store”
            }
        }
     */
    getMaxAppVersion: (param, spdUrl) => {
        return new Promise((resolve, reject) => {
            RTRequest.post(spdUrl + 'app/common/getMaxAppVersion', param)
                .then((res) => {
                    if (res.data) resolve(res.data);
                    else reject();
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    //上传照片
    cjUpload2: (fdData, spdUrl) => {
        return new Promise((resolve, reject) => {
            console.log('api-cjload-')  
            var xhr = new XMLHttpRequest();
            xhr.open('post',spdUrl+'app/common/AppImageSave');
            xhr.onreadystatechange = function(){
                if(xhr.status == 200){
                    if(xhr.readyState == 4){
                            var returnObj=null;
                            if(xhr.responseText) returnObj=JSON.parse(xhr.responseText);
                            if(returnObj && returnObj.url && returnObj.returnCode==200){
                                console.log(xhr.responseText)
                                resolve(returnObj.url)
                            }else{
                                reject()
                            }
                    }
                }else{
                    reject()
                }
            }
            //请求完成
            xhr.upload.onloadend = function(e){

            }
            //请求失败
            xhr.onerror =  function(e){
                console.log(e)
                reject(e)
            }
            xhr.upload.onprogress = function(event){
                var pre = Math.floor(100 * event.loaded / event.total);
            }
            //xhr.overrideMimeType("image/jpg");
            xhr.setRequestHeader('content-type','multipart/form-data');
            xhr.setRequestHeader('masterId',store.userStore.userId);
            xhr.setRequestHeader('platform','wechat');
            xhr.setRequestHeader('token',store.userStore.token);
            xhr.send(fdData);
            
        })
    },
    cjUpload: (fdData, spdUrl, progressCallBack) => {
        return new Promise((resolve, reject) => {
            RTRequest.upload(spdUrl + 'app/common/AppImageSave', fdData,(precent)=>{
                if(progressCallBack) progressCallBack(precent);
            },(response) => {
                console.log(response)
                resolve(response.data)
            },(err) =>{
                console.log(err);
                reject(err)
            });
             
        })
    },
    //百度鹰眼轨迹
    yyApi: (param, url) => {
        return new Promise((resolve, reject) => {
            RTRequest.post(url, param)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
};

export default Api;