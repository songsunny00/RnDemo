
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import React, { Component } from'react';
import {
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    View,
    Text,
    Image
} from 'react-native'
import { NavigationBar,Label,Button,Badge } from 'teaset';
import Icon from'react-native-vector-icons/MaterialCommunityIcons';
import { observer, inject } from 'mobx-react/native';


const options = [
    '取消', 
    '拍照',
    '相册'
  ]
const PicUploadBox = (props) => {
    return(
        <TouchableHighlight style={iStyle.touchBox} underlayColor="#eee" onPress={props.onPress}>
            <View style={iStyle.boxContainer}>
                <Icon size={60} name='camera' style={iStyle.boxIcon}></Icon>
            </View>
        </TouchableHighlight>
    )
}
class PicBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableHighlight style={iStyle.touchBox} underlayColor="#eee">
                <View>
                    <View style={iStyle.boxContainer}>
                        <Image source={{ uri: this.props.url, height: SCREEN_WIDTH / 3 - px2dp(80), width: SCREEN_WIDTH / 3 - px2dp(60) }} resizeMode='cover' style={styles.imgStyle}/>
                    </View>
                    <View style={{height:px2dp(40),borderBottomColor: '#ddd',borderBottomWidth: px2dp(2),paddingBottom: px2dp(5),alignItems:'center'}}>
                        <Icon size={20} name='delete' onPress={this.props.deleteImg}></Icon>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

@inject(["orderStore"],["locationStore"]) // 注入对应的store
@observer
export default class Receipt extends Component {
    constructor(props) {
        super(props);
        this.locationStore = this.props.locationStore;
        this.orderStore = this.props.orderStore;
    }
    //选择图片
    selectPhotoTapped(modal) {
        this.ActionSheet.show();
    }
    openCameraPicker(type) {
        if(type == 1) {
            ImagePicker.openCamera({
                //width: px2dp(493),
                //height: px2dp(309),
                loadingLabelText: '正在加载中,请稍后',
                compressImageQuality: 0.8,
                multiple:true,
                cropping: false
            }).then(image => {
                this._getCamera(image)
                console.log(image);
            });
        } else if (type == 2 ) {
            ImagePicker.openPicker({
                //width: px2dp(493),
                //height: px2dp(309),
                loadingLabelText: '正在加载中,请稍后',
                multiple: true,
                compressImageQuality: 0.8,
                cropping: false
            }).then(image => {
                this._getCamera(image)
                console.log(image);
            });
        }
    }

    _getCamera(image) {
        let imagsList = this.orderStore.picUploadList.slice();
        if (Array.isArray(image)) {
            imagsList = [...imagsList, ...image];
        } else {
            imagsList.push(image);
        }
        this.orderStore.picUploadList = imagsList;
        console.log( this.orderStore.picUploadList);
    }
    setSubmit() {
        this.orderStore.type='1';
        showLoading('正在加载...');
        this.orderStore.uploadImg((precent) => {
            console.log(precent);
        }).then((imgHttpLists) =>{
            this.orderStore.signTransport(this.locationStore.location).then(() => {
                this.orderStore.picUploadList = []; //签收后清空上传的列表
                //签收后刷新数据
                //Actions.push('Task', { orderPage: this.orderStore.orderLists.length === 1 ? 2 : 1 });
                Actions.Task({ orderPage: this.orderStore.orderLists.length === 0 ? 2 : 1 });
                hideLoading();
            }).catch(() => {
                hideLoading();
            })
        }).catch(() => {
            hideLoading();
        })
    }
    _deleteImg(index, path) {
        this.orderStore.picUploadList.splice(index,1);
        this.orderStore.prictureList.splice(index,1);
        ImagePicker.cleanSingle(path).then(() => {
            console.log('删除临时文件');
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
    
        let boxs = this.orderStore.picUploadList.slice().map((item, index) => {
            return (<PicBox url={item.path} key={item.localIdentifier + "_" + index } index={index} deleteImg={() => { this._deleteImg(index, item.path)}}/>)
        })
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.headerTitle}
                    type='ios'
                    style={{ height: px2dp(128), backgroundColor: Color.primary }}
                    statusBarStyle='default'

                    leftView={
                        <NavigationBar.BackButton title='返回' onPress={() => Actions.pop()} />
                    }
                />
                <View style={{ backgroundColor: 'white', flex: 1, marginTop: px2dp(128) }}>
                    <ScrollView>
                        <View style={[styles.itemBox, styles.borderStyle, { justifyContent: "flex-start" }]}>
                            <Icon size={20} name='chevron-double-right' style={styles.boxIcon} />
                            <Label type="title" style={styles.title}>签收图片</Label>
                        </View>
                        <View style={iStyle.picBoxContainer}>
                            {boxs}
                            <PicUploadBox onPress={() => this.selectPhotoTapped(false)} />
                        </View>
                    </ScrollView>
                    <View style={styles.btnWrap}>
                        <Button title={'确定'}
                            style={styles.btnStyle}
                            titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                                onPress={() => this.setSubmit()}
                        />
                    </View>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={"请选择类型"}
                    options={options}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={4}
                    onPress={(index) => { this.openCameraPicker(index) }}
                />
        </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        marginLeft: px2dp(10),
        fontSize: FONT_SIZE(14),
    },
    itemBox: {
        marginTop: px2dp(10),
        marginBottom: px2dp(10),
        flexDirection: 'row',
        alignItems: 'center',
        padding: px2dp(5),
    },
    borderStyle: {
        borderBottomColor: '#ddd',
        borderBottomWidth: px2dp(2),
        paddingBottom: px2dp(5),
    },
    boxIcon: {
        marginLeft: px2dp(15),
        marginRight: px2dp(5),
    },
    btnWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnStyle: {
        height: px2dp(80),
        flex: 1,
        marginHorizontal: px2dp(5),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 0,
    },
});
const iStyle = StyleSheet.create({
    picBoxContainer:{
        flexDirection: "row",
        flexWrap: "wrap",
        width: SCREEN_WIDTH - px2dp(100),
        margin: px2dp(20),
        //justifyContent: 'space-between'
    },
    touchBox:{
        borderWidth: pixel,
        borderColor: "#ccc",
        //flexDirection: 'row',
        marginVertical: px2dp(20),
        marginHorizontal: px2dp(10)
    },
    boxContainer:{
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH / 3 - px2dp(60),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    imgStyle:{
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH / 3 - px2dp(40),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    boxIcon:{
        color: '#F0D3D3',
    },
    boxText:{
        fontSize: FONT_SIZE(10),
        textAlign:"center",
        backgroundColor:"transparent"
    }
    
});