/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-26 14:42:34 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-07 21:54:19
 * @Description: 路由配置文件 
 */

import React from 'react';
import { StyleSheet, Text, View, BackHandler, StatusBar, DeviceEventEmitter } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';
import { Theme } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TabIcon from './Component/TabIcon';
import Loading from './Component/Loading';

import Login from './Pages/Login/Login';
import BaiduMap from './Pages/Login/baiduMap';
import Jpush from './Pages/Login/Jpush';
import BackTask from './Pages/Login/BackTask';
import CheckPermission from './Pages/Login/CheckPermission';
import SysConfig from './Pages/Login/SysConfig';
import ForgetPwd from './Pages/Login/ForgetPwd';
import RegAccount from './Pages/Register/Account';
import Protocol from './Pages/Register/Protocol';
import PersonalInfo from './Pages/Register/PersonalInfo';
import TruckInfo from './Pages/Register/TruckInfo';
import PicInfo from './Pages/Register/PicInfo';
import ResultInfo from './Pages/Register/ResultInfo';
import CityPicker from './Pages/Register/CityPicker';
import Work from './Pages/Main/Work';
import Menu from './Pages/Main/Menu';
import Task from './Pages/Main/Task';
import Map from './Pages/Main/Map';
import Search from './Pages/Main/Search';
import QRScan from './Pages/Main/QRScan';
import Profile from './Pages/Main/Silder/Profile';
import MyQR from './Pages/Main/Silder/MyQR';
import ShowPersonalInfo from './Pages/Main/Silder/ShowPersonalInfo';
import ShowTruckInfo from './Pages/Main/Silder/ShowTruckInfo';
import ShowPicInfo from './Pages/Main/Silder/ShowPicInfo';
import ModifyPwd from './Pages/Main/Silder/ModifyPwd';
import Card from './Pages/Main/Silder/Card';
import Income from './Pages/Main/Silder/Income';
import Setting from './Pages/Main/Silder/Setting';
import Help from './Pages/Main/Silder/Help';
import About from './Pages/Main/Silder/About';
import HistoryTask from './Pages/Main/Silder/HistoryTask';
import Feedback from './Pages/Main/Silder/Feedback';
import OrderDetail from './Pages/Main/OrderDetail';
import Receipt from './Pages/Main/Receipt';
import ReceiptPic from './Pages/Main/ReceiptPic';
import Home from './Pages/Main/Home';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        // console.log('ACTION:',action,Actions.currentScene)
        // console.log('Actions:', Actions);
        return defaultReducer(state, action);
    };
};

const getSceneStyle = () => ({
    backgroundColor: Theme.backgroundColor,
    shadowOpacity: 1,
    shadowRadius: 3,
});

const onBackPress = () => {
    //console.log(Actions.currentScene);
    //console.log(Actions.state);
    if (Actions.currentScene === 'LoginModal' || Actions.currentScene === 'Task') {
        Actions.reset('loading'); //退出后重新清空导航堆栈
        return false;
    }
   
    Actions.pop();
    return true;
}


const router = (...props) => (
    <Router createReducer={reducerCreate}
            getSceneStyle={getSceneStyle}
            backAndroidHandler={onBackPress}
    >
        <Modal
            hideNavBar
            transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
        >
            {/*<Scene component={Jpush} key="Jpush" />
            <Scene component={BackTask} key="BackTask" /> 
            <Scene component={BaiduMap} key="BaiduMap" /> 
            <Scene component={CheckPermission} key="CheckPermission" /> */}
            <Scene key="loading" component={Loading} on={isLogin} success="Workbench" failure="LoginModal" /> 
            <Stack hideNavBar headerMode='screen' key="root">
                <Stack gesturesEnabled={false} hideNavBar key="Login">
                    <Scene
                        title='登录'
                        key="LoginModal"
                        component={Login}
                        onExit={() => console.log('onExit')}
                        onLeft={Actions.pop}
                        type={ActionConst.REPLACE}
                    />
                    <Scene
                        key="SysConfig"
                        component={SysConfig}
                        onExit={() => console.log('onExit')}
                        onLeft={Actions.pop}
                    />
                    <Scene
                        key="ForgetPwd"
                        component={ForgetPwd}
                        onExit={() => console.log('onExit')}
                        onLeft={Actions.pop}
                    />
                    <Scene component={RegAccount} key="RegAccount" />                 
                </Stack>
                <Drawer hideNavBar key="Drawer" contentComponent={Menu}>
                    <Stack hideNavBar key="Workbench">
                        <Scene component={Home} key="Home" type={ActionConst.REPLACE}/>
                        <Scene component={Task} key="Task" type={ActionConst.REPLACE}/>
                        <Scene component={Search} key="Search" type={ActionConst.REPLACE}/>
                        <Scene component={QRScan} key="QRScan" />
                        <Scene component={OrderDetail} key="OrderDetail" />
                        <Scene component={Receipt} key="Receipt" />
                        <Scene component={ReceiptPic} key="ReceiptPic" />
                        <Scene component={Profile} key="Profile" />
                        <Scene component={MyQR} key="MyQR" />
                        <Scene component={Map} key="Map" />
                        <Scene component={ShowPersonalInfo} key="ShowPersonalInfo" />
                        <Scene component={ShowTruckInfo} key="ShowTruckInfo" />
                        <Scene component={ShowPicInfo} key="ShowPicInfo" />
                        <Scene component={ModifyPwd} key="ModifyPwd" />
                        <Scene component={Card} key="Card" />
                        <Scene component={Income} key="Income" />
                        <Scene component={Setting} key="Setting" />
                        <Scene component={Help} key="Help" />
                        <Scene component={About} key="About" />
                        <Scene component={Feedback} key="Feedback" />
                        <Scene component={HistoryTask} key="HistoryTask" />
                    </Stack>
                </Drawer>
                {/*// 推荐把需要的路由放在<Tabs/>后面，跳转的时候通过key，Actions.Test3_key*/}
                <Scene component={PersonalInfo} key="PersonalInfo" />
                <Scene component={Protocol} key="Protocol" />
                <Scene component={TruckInfo} key="TruckInfo" />
                <Scene component={CityPicker} key="CityPicker" />
                <Scene component={PicInfo} key="PicInfo" />
                <Scene component={ResultInfo} key="ResultInfo" />
                <Scene component={Menu} key="Menu" />
                <Scene component={Task} key="Task" />
            </Stack>

        </Modal>
    </Router>
);

export default router;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height:49,
    },
});