import Images from "../Resources/Images";

/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-20 15:38:06 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-08-09 11:27:58
 * @Description: 配置文件信息 
 */


const Config = {
    currIndex:1,
    serverList: [{
            key: 'innerDev',
            text: "内网开发",
            value: "http://10.69.10.70/module-api/"
            //value: "http://10.68.245.57:8888/module-api/"
        }, {
            key: 'outerDev',
            text: "外网开发",
            value: "http://sls.4006005656.com/wechat-hjx/shop/module-api/"
        }, {
            key: 'innerProduct',
            text: "内网生产",
            value: "http://10.69.10.2/module-api/"
        }, {
            key: 'outerProduct',
            text: "外网生产",
            value: "http://sls.4006005656.com/module-api/"
        }

    ],
    wesocketList: [{
            key: 'innerDev',
            text: "内网开发",
            value: "10.69.10.70/module-api/"
            //value: "10.68.245.57:8888/module-api/"
        }, {
            key: 'outerDev',
            text: "外网开发",
            value: "sls.4006005656.com/module-api-test/"
        }, {
            key: 'innerProduct',
            text: "内网生产",
            value: "10.69.10.2/module-api/"
        }, {
            key: 'outerProduct',
            text: "外网生产",
            value: "sls.4006005656.com/module-api/"
        }
    ],
    truckCodeColorList: [
        {
            key: 'blue',
            code: 'blue',
            name: '蓝牌',
            color: '#175EF0'
        },
        {
            key: 'yellow',
            code: 'yellow',
            name: '黄牌',
            color: '#F0EB17'
        },
        {
            key: 'green',
            code: 'green',
            name: '绿牌',
            color: '#88F40B'
        },
        {
            key: 'yellowGreen',
            code: 'yellowGreen',
            name: '黄绿牌',
            color: '#88F40B',
        }
    ],
    TruckClass:[
        {
            name: '小型面包',
            lengths: ['2.6 - 3.4']
        },
        {
            name: '皮卡',
            lengths: ['4.2-5.0','5.0-5.8']
        }, {
            name: '金杯',
            lengths: ['4.2-5.0','5.0-5.8']
        },
        {
            name: '依维柯',
            lengths: ['4.2-5.0', '5.0-5.8', '5.8-6.6']
        },
        {
            name: '厢式货车',
            lengths: ['1.8', '2.0', '2.5', '3.1', '3.3', '3.8', '4.2', '4.5', '4.8',  
                      '5.2', '5.5', '5.8', '6.2', '6.8','7.6','8.6 9.6']
        }, 
        {
            name: '冷藏车',
            lengths: ['小面冷链车', '金杯冷链车', '2.8箱式冷链', '3.3箱式冷链', '3.5箱式冷链', '4.2箱式冷链',
               '5.2箱式冷链', '5.8箱式冷链', '6.2箱式冷链', '6.8箱式冷链', '7.6箱式冷链']
        },
        {
            name: '平板货车',
            lengths: ['2.0平板', '2.5平板', '3.3平板', '3.8平板', '4.2平板', '5.2平板', '6.0平板', '6.2平板', 
                      '6.8平板', '7.6平板', '9.6平板']
        },
        {
            name: '高栏货车',
            lengths: ['6.2高栏', '6.8高栏', '7.6高栏', '9.6高栏']
        },
    ],
    PicUploadList:[
        {
            key: 'IDZM',
            pic: Images.IDZM,
            text: '身份证正面照'
        },
        {
            key: 'IDFM',
            pic: Images.IDFM,
            text: '身份证反面照'
        },
        {
            key: 'JSZFY',
            pic: Images.JSZFY,
            text: '驾驶证副页照'
        },
        {
            key: 'JSZZY',
            pic: Images.JSZZY,
            text: '驾驶证主页照'
        },
        {
            key: 'XSZZY',
            pic: Images.XSZZY,
            text: '行驶证主页照'
        },
        {
            key: 'XSZFY',
            pic: Images.XSZFY,
            text: '行驶证副页照'
        },
        {
            key: 'CLCM',
            pic: Images.CLCM,
            text: '车辆侧面照'
        }
    ],
    //运单状态
    Y_Status: [ 
        {
            key: '0',
            pic: Images.LoadCar,
            text: '待装车'
        },
        {
            key: '1',
            pic: Images.Delivery,
            text: '配送中'
        },
        {
            key: '2',
            pic: Images.Arrived,
            text: '已送达'
        },
        {
            key: '3',
            pic: Images.Exception,
            text: '异常报备'
        },
    ],
    //是否启用电子围栏
    AddressFence: {
        isOn: false, //是否启用
        radius: 500 //半径500米
    },
    //百度轨迹服务ak
    baiduYingyan: {
        ak: 'AEBt602p8eS8FoaATzkXCh9vjCOLFMIa',
        serviceId: '203625',
        url: 'http://yingyan.baidu.com/api/v3/',
        entityAdd: 'entity/add',
        entityUpdate: 'entity/update',
        entityDelete: 'entity/delete',
        entityList: 'entity/list',
        trackAddpoint: 'track/addpoint',
    }
};

export default Config;