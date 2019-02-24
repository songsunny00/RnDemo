/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-04-23 11:05:42 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-07 20:29:36
 * @Description: 文件信息说明 
 */
import { userStore } from "./UserStore";
import { orderStore } from "./OrderStore";
import { locationStore } from "./LocationStore";
import { socketStore } from "./SocketStore";
import { jpushStore } from "./JpushStore";

const store = { userStore, orderStore, locationStore, socketStore, jpushStore };

export default store;