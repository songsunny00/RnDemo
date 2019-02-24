
import ImagePicker from 'react-native-image-crop-picker';
import React, { Component } from 'react';
import {
    Modal,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  View,
  Image
} from 'react-native'
import { Button } from 'teaset';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { observer, inject } from 'mobx-react/native';

const PicUploadBox = (props) => {
    return(
        <TouchableHighlight style={iStyle.touchBox} underlayColor="#eee" onPress={props.onPress}>
            <View style={iStyle.boxContainer}>
                <Icon size={60} name='camera' style={iStyle.boxIcon}></Icon>
                {/* <Text style={iStyle.boxText}>{props.text}</Text> */}
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
                <View style={iStyle.boxContainer}>
                    {/* <Text>{this.props.url}</Text> */}
                    <Image source={{uri:this.props.url,height:200,width:200}} style={styles.imgStyle}/>
                </View>
            </TouchableHighlight>
        )
    }
}

@inject(["orderStore"]) // 注入对应的store
@observer
export default class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.orderStore = this.props.orderStore;
        this.state = {
            modalVisible: false,
            imgSrc:[]
        };
        this.imgSrc=[]
    }
    setModalVisible(visible) {
        console.log('modalVisible'+visible)
        this.setState({modalVisible: visible});
        this.props.setFooter(!visible)
    }

    _renderContent() {
        let content=(<View style={styles.wrapStyle} >
            <Button title='拍照' style={styles.overViewButtonStyle} 
                titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                onPress={() => {
                    ImagePicker.openCamera({
                        width: px2dp(493),
                        height: px2dp(309),
                        cropping: false
                    }).then(image => {
                        this._getCamera(image)
                        console.log(image);
                    });
                } 
            }/>
            <Button title='相册' style={styles.overViewButtonStyle}
                titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                onPress={() => {
                    ImagePicker.openPicker({
                        width: px2dp(493),
                        height: px2dp(309),
                        cropping: false
                    }).then(image => {
                        this._getCamera(image)
                        console.log(image);
                    });
                }
            }/>
            <Button title='取消' style={styles.overViewButtonStyle}
                titleStyle={{ fontSize: FONT_SIZE(14), color: '#fff' }}
                onPress={() =>this.setModalVisible(false)} />
        </View>)
        return(content)
    }
    //选择图片
    selectPhotoTapped() {
        const options = {
            title: '选择图片', 
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', 
            chooseFromLibraryButtonTitle: '选择照片', 
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
              ],
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high', 
            durationLimit: 10, 
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8, 
            angle: 0,
            allowsEditing: false, 
            noData: false,
            storageOptions: {
                skipBackup: true  
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log(response);
                this._getCamera(response)
                
            }
        });
    }

    _getCamera(image) {
        console.log(image);
        this.setModalVisible(false);
        this.orderStore.picUploadList.push(image);
        console.log( this.orderStore.picUploadList);

        //this.props.getImgList(image)
    }
    render() {
    
    let boxs = this.orderStore.picUploadList.map((item, index) => {
        return (<PicBox url={item.path} key={item.path}/>)
    })
    return (
        <View>
            <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',flex:1,flexWrap:'wrap'}}>
                {boxs}
                <PicUploadBox onPress={this.selectPhotoTapped.bind(this)} />
            </View>
            {this.state.modalVisible ? this._renderContent() :null}
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    wrapStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        flexDirection:'column',
        justifyContent:'center',
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT*0.6
    },
    overViewButtonStyle: {
        height: px2dp(80),
        marginTop: px2dp(20),
        marginRight: px2dp(20),
        width: SCREEN_WIDTH - px2dp(280),
        backgroundColor: Color.primary,
        borderColor:  Color.primary,
        borderRadius: 10
    },
});
const iStyle = StyleSheet.create({
    touchBox:{
        borderWidth: pixel,
        borderColor: "#ccc",
        //flexDirection: 'row',
        marginVertical: px2dp(20)
    },
    boxContainer:{
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH / 3 - px2dp(80),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    imgStyle:{
        alignItems:"center",
        justifyContent:"center",
        width: SCREEN_WIDTH / 3 - px2dp(80),
        height: SCREEN_WIDTH / 3 - px2dp(80),
    },
    boxIcon:{
        color: '#F0D3D3',
    },
    boxText:{
        fontSize: FONT_SIZE(10),
        textAlign:"center",
        backgroundColor:"transparent"
    },
    buttonStyle: {
        height: px2dp(80),
        marginTop: px2dp(100),
        width: SCREEN_WIDTH - px2dp(280),
        backgroundColor: Color.primary,
        borderColor: Theme.transparentColor,
        borderRadius: 20
    }, 
    
});