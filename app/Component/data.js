//http://10.69.10.70/module-api/newTms/dispatch/queryTransportOrder
{
    "returnCode": "200",
    "info": "查询成功",
    "data": [
        {
            "gridNo": "T1807231235036",
            "transportNo": "Y1807205406608",
            "customerNo": "TEST001",
            "deliveryTime": "2018-06-01 00:00:00",
            "address": "广东省惠州市惠城区仲恺高新区惠风三路17号TCL科技大厦",
            "consignee": "李四",
            "mobilePhone": null,
            "qty": 1,
            "weight": 0.05,
            "volume": 0.002,
            "status": "0",
            "item": [
                {
                    "productName": "32寸电视",
                    "qty": 1,
                    "weight": 0.05,
                    "volume": 0.002,
                    "transportNo": "Y1807205406608",
                    "rownum": "eafae94a-dc71-429f-875b-0c75d1fa5209",
                    "rowState": null,
                    "validFields": [
                        "productName",
                        "qty",
                        "transportNo",
                        "volume",
                        "weight"
                    ]
                }
            ],
            "pictureList": null,
            "consigneelng": "114.35981",
            "consigneelat": "23.03549",
            "shipperlng": "114.40074",
            "shipperlat": "23.083698",
            "taskStatus": "0",
            "ettaSignTime": "",
            "ettaRejectRemark": null,
            "ettaDepartDate": ""
        }
    ],
    "totalNum": 1,
    "loadCarNum": 1,
    "deliveryNum": 0,
    "arrivedNum": 0
}

//司机登录接口返回
{
	"returnCode": 200,
	"info": "用户登录成功！",
	"data": {
		"name": "宋歌",
		"phone": "13666666666",
		"siteCode": "HZCY",
		"siteName": "惠州储运组",
		"supplierCode": "GSHZ",
		"supplierName": "共生惠州(同城配)",
		"masterId": "59728",
		"token": "aa0764e1-a5d4-467e-ae20-f943d5d53513",
		"isVerify": true,
		"isPhotoVerify": false,
		"isVehicleVerify": true,
		"carNo": "粤L78K93"
	}
}