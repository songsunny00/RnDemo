/*
 * @Author: songsunny
 * @LastEditors: songsunny
 * @Description: 地理信息状态管理
 * @Github: https://github.com/songsunny00
 * @Date: 2019-02-11 13:35:47
 * @LastEditTime: 2019-03-06 14:51:39
 */

import { observable, action } from "mobx";
import { Geolocation, GetDistance } from 'react-native-baidu-map';
import CityData from './../Component/CityListPicker/CityData';
import Permissions from 'react-native-permissions';
import { BackHandler } from "react-native";
import Config from "../Common/Config";

class LocationStore {
    @observable latitude = ''; // 注册变量，使其成为可检测的
    @observable longitude = '';
    @observable cenLat = 0 ;
    @observable cenLng = 0;
    @observable address = '';
    @observable city = '';
    @observable distance = ''; //订单与当前的距离
    @observable zoom = 15; //默认显示的层级
    @observable isSign = false; //是否可以签收
    @observable nowCityList = [];
    
	constructor() {
   	 	// 初始化变量，可以定义默认值
        //this.getPermisions();
  	}
    
    @action
    getCurrentPosition = () => {
        console.log('正在定位中')
        this.address = '正在定位中';
        this.city = '正在定位中';
        this.distance = '正在获取中';

        //获取当前的位置
        Geolocation.getCurrentPosition().then(data => {
            console.warn(JSON.stringify(data));
            //sucecssCallback(data);
            this.location = data;
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.address = data.address;
            this.city = data.city;
            this.district = data.district;
            if (data.city) {
                this.nowCityList = this.filterCityData(data.city.replace('市', ''));
            }
            
            //console.warn(this.nowCityList);
        })
        .catch(e => {
            console.warn(e, 'error');
            //failCallback(e);
        })
    }

    //获取当前位置与订单位置的直线距离
    getDistance = (lat1, lng1) => {
        return new Promise((resolve, reject) => { 
            GetDistance.getDistance(lat1, lng1, this.latitude, this.longitude)
                .then((data) => {
                    d = Number.parseFloat(data.distance);
                    this.distance = this.formatDistance(d);
                    this.isSign = this.checkIsSign(d);
                    this.zoom = this.getZoom(d);
                    this.cenLat = (lat1 + this.latitude) / 2;
                    this.cenLng = (lng1 + this.longitude) / 2;
                    resolve(d);
                })
                .catch(e => {
                    console.warn(e, 'error');
                    //failCallback(e);
                })
        })
    }

    getDistanceLocal = (lat1, lng1) => {
        const EARTH_RADIUS = 6378.137; //地球半径  
        let radLat1 = lat1 * Math.PI / 180.0;
        let radLat2 = this.latitude * Math.PI / 180.0;
        let radLng1 = lng1 * Math.PI / 180.0;
        let radLng2 = this.longitude * Math.PI / 180.0;
        let a = radLat1 - radLat2;
        let b = radLng1 - radLng2;
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
            + Math.cos(radLat1) * Math.cos(radLat2)
            * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 1000) /// 1000; //单位米
        this.distance = this.formatDistance(s);
        this.isSign = this.checkIsSign(s);
        return s;
    }
    
    formatDistance = (d) => {
        if (d < 1000) 
            return (Math.round(d) + "米");
        else if (d > 1000)
            return((Math.round(d / 100) / 10).toFixed(1) + "公里");
    }

    checkIsSign = (d) => {
        if (Config.AddressFence.isOn) {
            return d - Config.AddressFence.radius > 0 ? false : true; //签收距离换算
        } 
        return true;
    }

    filterCityData = (text) => {
        //console.log('search for list', text);
        text = text.toLowerCase();
        let rst = [];
        let citys = Object.values(CityData);
        for (let idx = 0; idx < citys.length; idx++) {
            let item = citys[idx];
            for (let i = 0; i < item.length; i++) {
                if ((item[i].cityName.toLowerCase()).indexOf(text) === 0 || (item[i].cityNameEn.toLowerCase()).indexOf(text) === 0) {
                    rst.push(item[i]);
                }
            }
        }
        return rst;
    }
    //设置地图的层级
    getZoom = (d) => {
        let zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000"]//级别18到3。
        for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
            if (zoom[i] - d > 0) {
                return 18 - i + 2//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
            }
        }; 
    }
    
    //上传定位到后台
    

}

const locationStore = new LocationStore(); 
export { locationStore };