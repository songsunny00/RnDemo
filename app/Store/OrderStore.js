/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-04-23 10:39:14 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-08 18:54:27
 * @Description: 基于mobx的数据文件 
 */

import {observable, action} from "mobx";
import localStorage from 'react-native-simple-store';

class OrderStore {
    @observable loading = false;
    @observable orderLists = [];//当前订单集
    orderListsMap = observable.map();
    @observable loadCarNum = 0;//查询‘待装车’订单集数量
    @observable deliveryNum = 0;//查询‘配送中’订单集数量
    @observable arrivedNum = 0;//查询‘已完成’订单集数量
    pageIndex = 1;//当前订单页码
    totalPage = 0;//总页数
    pageSize = 10; //每页大小
    @observable hasMore = true;//
    @observable searchLists = [];//搜索相应订单集
    @observable searchWord = '';//搜索关键词
    @observable searchWordType = '关键字';//搜索关键词说明
    gridNo = '';//发车单号
    @observable orderStatus = '0';//当前tab标签
    @observable orderDetail = {};//运输单号详情
    type = '1';//签收类型 1正常 0异常
    @observable picUploadList = [];//签收回单照片
    @observable prictureList = [];//签收回单照片

    constructor() {
        console.log('localStorage:orderstore:baseinfo')
        this.getBaseInfo();
    }

    getBaseInfo = () =>{
        return new Promise((resolve, reject) => {
            localStorage.get('baseInfo').then((item) => {
                if (item) {
                    this.token = item.token;
                    this.userName = item.name;
                    this.phone = item.phone;
                    this.userId = item.masterId;
                    this.carNo = item.carNo ? item.carNo : '';
                    this.isPhotoVerify = item.isPhotoVerify;
                    this.isVehicleVerify = item.isVehicleVerify;
                    this.isVerify = item.isVerify;
                    this.spdUrl = item.serverUrl;
                    resolve()
                }
            });
        });
    }

    @action
    setOrderStatus = (orderStatus) => {
        this.orderStatus = orderStatus;
        this.pageIndex = 1;
        this.totalPage = 0;
        this.hasMore = true;
        this.loading = true;
        
        this.queryTransportOrder(orderStatus, 1).then(() => {
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

    @action // 查询订单
    queryTransportOrder = (orderStatus, pageIndex) => {
        return new Promise((resolve, reject) => {
            if(this.orderStatus != orderStatus && pageIndex != 1) return;
            let params = {
                userId: this.userId,
                userType:'2',//商铺类型
                status:'200',//配送中
                orderNo: '',
                pageSize: this.pageSize,
                pageIndex: pageIndex
            }
            if(orderStatus != '0') params['status'] = orderStatus;
            console.log(params)
            
            if (pageIndex < 2) this.orderListsMap.set(orderStatus, []);
            if((pageIndex + 1) == this.totalPage && pageIndex != 1) return;
            Api.getList(params, this.spdUrl).then((res) => {
                let data =res.data;
                this.loadCarNum = res.loadCarNum;
                this.deliveryNum = res.deliveryNum;
                this.arrivedNum = res.arrivedNum;
               
                this.totalPage = Math.ceil(res.totalNum / params.pageSize);
                if (!data) { data = []}
                //this.orderLists = [...this.orderListsMap.get(orderStatus), ...data];
                this.orderListsMap.set(orderStatus, [...this.orderListsMap.get(orderStatus), ...data]);
                if (this.orderStatus == '0' && data.length) {
                    this.gridNo = data[0].gridNo;
                }
                this.orderLists = this.orderListsMap.get(orderStatus);
                resolve(data)
            }).catch(() => {
                reject()
            });
        });
    };

    @action// 发车
    departConfirm = (longitude,latitude) => {
        return new Promise((resolve, reject) => {
            let params={
                userId:this.userId,
                gridNo: this.gridNo,
                driver:this.userName,
                carNo:this.carNo,
                mobilePhone:this.phone,
                longitude:longitude,
                latitude:latitude
            }
            console.log(params)
            Api.departConfirm(params, this.spdUrl).then((res) => {
                resolve(res);
            }).catch(() => {
                reject();
            })
        })
    };
    
    @action// 签收
    signTransport = (location, cause='') => {
        return new Promise((resolve, reject) => {
            let prictureList='';
            if(this.prictureList.length){
                prictureList = this.prictureList+'';
            }
            let params={
                userId: this.userId,
                transportNo: this.orderDetail.transportNo,
                type: this.type,
                cause: cause,
                address: location.address?location.address:'广东省惠州市惠城区合生大桥',
                longitude: location.address?location.longitude:'23.11353985',
                latitude: location.address?location.latitude:'114.41065808',
                prictureList:prictureList
            }
            console.log(params)
            Api.signTransport(params, this.spdUrl).then((res) => {
                resolve(res);
            }).catch(() => {
                reject();
            })
        })
    };
    
    uploadImg = (progressCb) => {
        return new Promise((resolve, reject) => {
            var j=0,imgArray=[];
            let transportNo = this.orderDetail.transportNo,len = this.picUploadList.length;
            for(let i=0; i<len; i++) {
                let fileObj = this.picUploadList[i];
                fileObj['typeNo'] = transportNo;
                Api.cjUpload(fileObj, this.spdUrl, (precent) => {
                        if(progressCb) progressCb((precent+j)/len)
                    }).then((result) => {
                    try{
                        let imgurl = JSON.parse(result).url;
                        if(imgurl){
                            j++;
                            imgArray.push(imgurl);
                        } 
                        if(j==len) {this.prictureList=imgArray;resolve(imgArray);}
                        }catch(err){
                        reject();
                        console.log(err)
                    }
                }).catch((err) => {
                    console.log(err);
                    reject();
                })
            }
        })
    };
    
    @action// 搜索
    searchOrder = (userId) => {
        return new Promise((resolve, reject) => {
            let params = {
                userId: userId,
                orderNo: this.searchWord,
                status: '',
                pageSize: 20,
                pageIndex: 1
            }
            console.log(params)
            Api.getList(params, this.spdUrl).then((res) => {
            let data =res.data;
            if(!data){data=[];}
                this.searchLists = data;
                resolve()
            }).catch(() => {
                reject()
            });
        });
    };
}
const orderStore = new OrderStore();
export { orderStore };