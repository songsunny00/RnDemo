/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 本地存储封装-react-native-storag
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-25 14:31:40
 * @LastEditTime: 2019-02-25 15:31:54
 */
import { 
    AsyncStorage, 
} from 'react-native';

// 第三方框架
import Storage from 'react-native-storage';

let storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
    
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,
    
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
    
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  //sync: require('./StorageSync')
})  
storage.addItem = (key,data,expires) =>{
    storage.save({
        key,
        data,
        expires: (expires|| expires===null) ? expires: 1000 * 3600 * 24
    })
}
storage.addItemIndex = (key,id,data,expires) =>{
    storage.save({
        key,
        id,
        data,
        expires: (expires|| expires===null) ? expires: 1000 * 3600 * 24
    })
}
storage.getItem = (key) =>{
    storage
    .load({
        key
    })
    .then(ret => {
        // 如果找到数据，则在then方法中返回
        console.log(ret);
        return ret
    })
    .catch(err => {
        // 如果没有找到数据且没有sync方法，
        // 或者有其他异常，则在catch中返回
        console.warn(err.message);
        switch (err.name) {
        case 'NotFoundError':
            // TODO;
            break;
        case 'ExpiredError':
            // TODO
            break;
        }
    });
}
storage.getItemIndex = (key,id) =>{
    storage
    .load({
        key,
        id
    })
    .then(ret => {
        // 如果找到数据，则在then方法中返回
        console.log(ret);
        return ret
    })
    .catch(err => {
        // 如果没有找到数据且没有sync方法，
        // 或者有其他异常，则在catch中返回
        console.warn(err.message);
        switch (err.name) {
        case 'NotFoundError':
            // TODO;
            break;
        case 'ExpiredError':
            // TODO
            break;
        }
    });
}
storage.removeItem = (key) =>{
    storage.remove({
        key
    });
}
storage.removeItemIndex = (key,id) =>{
    storage.remove({
        key,
        id
    });
}
//storage.clearMap(); // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
// --------------------------------------------------

// 获取某个key下的所有id(仅key-id数据)
// storage.getIdsForKey('user').then(ids => {
//     console.log(ids);
// });
  
// 获取某个key下的所有数据(仅key-id数据)
// storage.getAllDataForKey('user').then(users => {
//     console.log(users);
// });
  
// !! 清除某个key下的所有数据(仅key-id数据)
//storage.clearMapForKey('user');
  
// -----------------读取批量数据---------------------------------
// 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
// 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
// storage.getBatchData([
// 	{ key: 'loginState' },
// 	{ key: 'checkPoint', syncInBackground: false },
// 	{ key: 'balance' },
// 	{ key: 'user', id: '1009' }
// ])
// .then(results => {
//   results.forEach( result => {
//     console.log(result);
//   })
// })

//根据key和一个id数组来读取批量数据
// storage.getBatchDataWithIds({
//   key: 'user',
//   ids: ['1001', '1002', '1003']
// })
// .then( ... )

export default storage;
//在这里设置`storage.sync`
storage.sync = require('./StorageSync').sync;
