/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-08-04 23:07:50 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-05 13:36:12
 * @Description: 极光推送相关 
 */


import { observable, action } from "mobx";
import JPushModule from 'jpush-react-native';

class JpushStore {
    @observable receiveCustomMsgEvent = 'receivePushMsg';
    @observable receiveNotificationEvent = 'receiveNotification';
    @observable openNotificationEvent = 'openNotification';
    @observable getRegistrationIdEvent = 'getRegistrationId';
    @observable registrationId = ''; //100d85590916382e39a Android 191e35f7e01f20c878d ios
    @observable pushMsg = '';
    @observable alertContent = '';

	constructor() {
        //initJPush();
  	}

    onStopPress = () => {
        JPushModule.stopPush();
        console.log('Stop push press');
    }

    onResumePress = () => {
        JPushModule.resumePush();
        console.log('Resume push press');
    }

    setTag = (tag) => {
        if (tag) {
            /**
             * 请注意这个接口要传一个数组过去，这里只是个简单的示范
             */
            JPushModule.setTags(tag.split(','), map => {
                if (map.errorCode === 0) {
                    console.log('Tag operate succeed, tags: ' + map.tags);
                } else {
                    console.log('error code: ' + map.errorCode);
                }
            })
        }
    }

    addTag = (tag) => {
        console.log('Adding tag: ' + tag);
        JPushModule.addTags(tag.split(','), map => {
            if (map.errorCode === 0) {
                console.log('Add tags succeed, tags: ' + map.tags);
            } else {
                console.log('Add tags failed, error code: ' + map.errorCode);
            }
        })
    }

    deleteTags = (tag) => {
        console.log('Deleting tag: ' + tag)
        JPushModule.deleteTags(tag.split(','), map => {
            if (map.errorCode === 0) {
                console.log('Delete tags succeed, tags: ' + map.tags)
            } else {
                console.log('Delete tags failed, error code: ' + map.errorCode)
            }
        })
    }

    checkTag = (tag) => {
        console.log('Checking tag bind state, tag: ' + tag);
        JPushModule.checkTagBindState(tag, map => {
            if (map.errorCode === 0) {
                console.log(
                    'Checking tag bind state, tag: ' +
                    map.tag +
                    ' bindState: ' +
                    map.bindState
                )
            } else {
                console.log(
                    'Checking tag bind state failed, error code: ' + map.errorCode
                );
            }
        })
    }

    getAllTags = () => {
        JPushModule.getAllTags(map => {
            if (map.errorCode === 0) {
                console.log('Get all tags succeed, tags: ' + map.tags)
            } else {
                console.log('Get all tags failed, errorCode: ' + map.errorCode)
            }
        })
    }

    cleanAllTags = () => {
        JPushModule.cleanTags(map => {
            if (map.errorCode === 0) {
                console.log('Clean all tags succeed');
            } else {
                console.log('Clean all tags failed, errorCode: ' + map.errorCode);
            }
        })
    }

    setAlias = (alias) => {
        if (alias) {
            JPushModule.setAlias(alias, map => {
                console.log(map);
                if (map.errorCode === 0) {
                    console.log('set alias succeed')
                } else {
                    console.log('set alias failed, errorCode: ' + map.errorCode)
                }
            })
        }
    }

    deleteAlias = () => {
        console.log('Deleting alias');
        JPushModule.deleteAlias(map => {
            console.log(map);
            if (map.errorCode === 0) {
                console.log('delete alias succeed');
            } else {
                console.log('delete alias failed, errorCode: ' + map.errorCode);
            }
        })
    }

    getAlias = () => {
        JPushModule.getAlias(map => {
            console.log(map);
            if (map.errorCode === 0) {
                console.log('Get alias succeed, alias: ' + map.alias)
            } else {
                console.log('Get alias failed, errorCode: ' + map.errorCode)
            }
        })
    }

    setBaseStyle() {
        if (Platform.OS === 'android') {
            JPushModule.setStyleBasic();
        } else {
            console.log('iOS not support this function');
        }
    }

    setCustomStyle() {
        if (android) {
            JPushModule.setStyleCustom();
        } else {
            console.log('iOS not support this function');
        }
    }

    initJPush = () => {
        if (Android) {
            JPushModule.initPush();
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            })
        } else {
            JPushModule.setupPush();
        }

        JPushModule.addReceiveCustomMsgListener(map => {
            console.log(map);
            this.pushMsg = map.content;
            console.log('extras: ' + map.extras);
        })

        JPushModule.addReceiveNotificationListener(map => {
            console.log(map);
            this.alertContent = map.alertContent;
            console.log('alertContent: ' + map.alertContent);
            console.log('extras: ' + map.extras);
        })

        JPushModule.addReceiveOpenNotificationListener(map => {
            console.log('Opening notification!');
            console.log('map.extra: ' + map.extras);
        })

        JPushModule.addGetRegistrationIdListener(registrationId => {
            console.log('Device register succeed, registrationId ' + this.registrationId);
        })

        JPushModule.getRegistrationID(registrationId => {
            this.registrationId = registrationId;
        })
        
        
    }

    sendLocalNotification = () => {
        let currentDate = new Date();
        let notification = {
            buildId: 1,
            id: 5,
            title: 'jpush',
            content: 'This is a test!!!!',
            extra: {
                key1: 'value1',
                key2: 'value2'
            },
            fireTime: Android ? 2000 : new Date().getTime() + 2000,
            soundName: null
        }
        JPushModule.sendLocalNotification(notification);
    }

    clearAllNotifications = () =>  {
        JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgEvent);
        JPushModule.removeReceiveNotificationListener(this.receiveNotificationEvent);
        JPushModule.removeReceiveOpenNotificationListener(this.openNotificationEvent);
        JPushModule.removeGetRegistrationIdListener(this.getRegistrationIdEvent);
        console.log('Will clear all notifications');
        JPushModule.clearAllNotifications();
    }

}

const jpushStore = new JpushStore(); 
export { jpushStore };