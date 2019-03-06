/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 公共状态管理
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-11 13:35:47
 * @LastEditTime: 2019-03-06 14:59:07
 */

import { observable, action } from "mobx";
import Permissions from 'react-native-permissions';
import { BackHandler } from "react-native";

class ComStore {
    @observable permissionsList = null;

    types = ['location', 'camera', 'photo'];
    permissionTip = {
        location : '无法获取位置权限,无法使用GPS',
        camera: '无法相机权限,无法使用拍照功能',
        photo: '无法获取相册权限,无法使用相册功能'
    };
    
    
	constructor() {
   	 	// 初始化变量，可以定义默认值
        //this.getPermisions();
  	}
    
    //获取权限
    getPermisions() {
        Permissions.checkMultiple(this.types)
            .then(status => {
                this.types.map((p)=> {
                    if (status[p] != 'authorized') {
                        let options;
                        if (p == 'location') {
                            options = 'always';
                        }
                        Permissions.request(p, options).then(response => {
                            if (response == 'restricted') {
                                this.showpermissionTip(p);
                            } else {
                                this.getPermisions();
                            }
                            
                        }).catch(e => console.log(e))
                    }
                })
                this.permissionsList = status;
                console.log(this.permissionsList);
            })
            .catch(e => console.warn(e));
    }
    //检查权限
    showpermissionTip(permission) {
        Alert.alert(
            '出错了!',
            this.permissionTip[permission]+',请检查你的权限设置,设置->应用->获取权限',
            [
                { text: '确定', onPress: () => {
                        if(Android) {
                            BackHandler.exitApp();
                        } else {
                            Permissions.canOpenSettings();
                        }
                    }
                },
            ],
            { cancelable: false }
        )
    }

}

const comStore = new ComStore(); 
export { comStore };