/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-04-23 10:39:14 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-09 09:40:45
 * @Description: 基于mobx的数据文件 
 */

import { observable, action } from "mobx";
import { Geolocation } from 'react-native-baidu-map';
//import io from 'socket.io-client';

class SocketStore {
    @observable socket = null; // 注册变量，使其成为可检测的
    @observable socketReturnText = '正在连接';
    @observable taskId = null; // 注册变量，使其成为可检测的

	constructor() {
   	 	
  	}

    @action
    startSocket = (socketUrl, userId, token) => {
        return new Promise((resolve, reject) => {
            console.log('初始化socket');
            console.log(socketUrl);
            // 强制指定使用 websocket 作为传输通道
            let wsurl =this.getWsUrl(socketUrl, userId, token);
            this.socket = new WebSocket(wsurl);

            this.socket.onopen = () => {
                console.log('onopen')
                resolve();
                //this.socket.send('something'); // 发送一个消息
            };

            this.socket.onmessage  = (e) => {
                console.log('onmessage');
                console.log(e.data);
                let obj=JSON.parse(e.data);
                this.socketReturnText = obj.info;
                if((obj.returnCode == 401 || obj.returnCode == '401') && this.websock){
                    this.socket.close();
                    reject();
                }

            };

            this.socket.onerror = (e) => {
                console.log('onerror');
                this.socketReturnText = '上传失败';
            };

            this.socket.onclose = (e) => {
                // 连接被关闭了
                console.log('onclose');
                this.socketReturnText = '连接关闭';
                this.websock = null;
                this.socket.onopen();//再次连接
            };
        })

    }

    sendMsg = (agentData) => {
        console.log(agentData)
        if(this.socket){
            this.socket.send(JSON.stringify(agentData))
        }else{
            this.startSocket();
        }
    }

    getWsUrl = (socketUrl, userId, token) => {
        let timestamp=formatTime(new Date(),true);
        let signStr="masterId="+userId+"&timestamp="+timestamp+"&key="+token;
        let sign=getmd5(signStr).toUpperCase();
        const wsuri = "ws://"+socketUrl+"websocket?masterId="+userId+"&timestamp="+timestamp+"&sign="+sign;
        return wsuri;
    }

}

const socketStore = new SocketStore(); 
export { socketStore };