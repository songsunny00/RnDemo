/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 路由入口
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-11 13:35:47
 * @LastEditTime: 2019-03-05 17:23:00
 */

import { userStore } from "./UserStore";
import { orderStore } from "./OrderStore";
import { locationStore } from "./LocationStore";
import { comStore } from "./ComStore";
import { socketStore } from "./SocketStore";
import { jpushStore } from "./JpushStore";

const store = { userStore, orderStore, locationStore, socketStore, jpushStore, comStore};

export default store;