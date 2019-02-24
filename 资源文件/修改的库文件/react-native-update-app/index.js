import React, {Component} from "react"
import {
    NativeModules,
    View,
    Modal,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    AlertIOS,
    Platform,
    Linking,
    ImageBackground,
    StatusBar,
    ToastAndroid,
    ScrollView
} from "react-native"

const {RNUpdateApp} = NativeModules
const RNFS = require("react-native-fs")
const {width, height} = Dimensions.get("window")
const isIOS = Platform.OS == "ios"


class RNUpdate extends Component {
    // 定义默认属性
    static defaultProps = {
        progressBarColor: "#f50",
        updateBoxWidth: 250,
        updateBoxHeight: 250,
        updateBtnHeight: 38,
        updateBtnText: "立即更新",
        theme: 1,
        bannerWidth: 250,
        bannerHeight: 120,
        bannerResizeMode: 'contain',
        successTips: "", // 包下载成功的提示
        errorTips: "", // 下载发生错误的提示
        CancelTips: "", // 用户取消升级的提示
        bannerImage: require('./theme/1/banner.png'),
        closeImage: require('./theme/1/close.png'),
    }

    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            modalVisible: false,
            desc: [], //更新说明
            fileSize: -1,
            version: '',
            upgradeFlag: 0 //强制更新标识 0 否 1 是
        }

        this.jobId = 0 // 下载任务的id，用来停止下载
        this.fetchRes = {} // 远程请求更新的json数据

        this.loading = false // 是否在下载中

        this.filePath = ''
    }

    async componentWillMount() {
        if (this.props.onBeforeStart) {
            let res = await this.props.onBeforeStart();
            this.checkUpdate(res);
        }
    }

    reset() {
        this.setState({
            progress: 0,
            modalVisible: false,
            desc: [], //更新说明
            fileSize: -1,
            version: '',
            upgradeFlag: 0 //强制更新标识 0 否 1 是
        })

        this.jobId = 0 // 下载任务的id，用来停止下载
        this.fetchRes = {} // 远程请求更新的json数据

        this.loading = false // 是否在下载中
    }

    checkUpdate(fetchRes, isManual) {
        try {
            this.fetchRes = fetchRes
            let { version, updateContent, upgradeFlag, appUpgrade } = fetchRes
            this.fetchRes.url = isIOS ? fetchRes.iosUrl : fetchRes.androidUrl ;
            // 安装包下载目录

            if (!Array.isArray(updateContent)) {
                desc = [updateContent];
            } else {
                desc = updateContent;
            }


            if (appUpgrade) {
                try {
                    RNUpdateApp.getFileSize(this.fetchRes.url).then(async fileSize => {
                        fileSize = Number(fileSize / 1024 / 1024).toFixed(2, 10)

                        this.setState({
                            modalVisible: true,
                            desc,
                            version,
                            fileSize
                        })
                    })
                } catch (e) {
                    this.setState({
                        modalVisible: true,
                        version,
                        desc
                    })
                }
            } else {
                if (isManual) {
                    if(isIOS) {
                        AlertIOS.alert(
                            '检查更新',
                            '已经是最新版本!',
                            [
                                {
                                    text: "确定",
                                    style: "cancel"
                                }
                            ]
                        );
                    } else {
                        ToastAndroid.show("已经是最新版本",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        )
                    }
                    
                }
            }
        } catch (e) {
            console.error('checkUpdate', e)
        }
    }

    errorTips = () => {
        ToastAndroid.show("安装失败",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    androidUpdate = async () => {
        let _this = this
        const {url, fileName, version} = this.fetchRes
        // 按照目录/包名/文件名 存放，生成md5文件标识

        this.filePath = `${RNFS.ExternalDirectoryPath}/${fileName}${version}.apk`

        // 检查包是否已经下载过，如果有，则直接安装
        let exist = await RNFS.exists(this.filePath)
        if (exist) {
            RNUpdateApp.install(this.filePath)
            this.hideModal()
            return
        }

        // 下载apk并安装
        RNFS.downloadFile({
            fromUrl: url,
            toFile: this.filePath,
            progressDivider: 2,   // 节流
            begin(res) {
                _this.jobId = res.jobId   // 设置jobId，用于暂停和恢复下载任务
                this.loading = true
            },
            progress(res) {
                let progress = (res.bytesWritten / res.contentLength).toFixed(2, 10)
                // 此处 this 指向有问题，需要使用 _this
                _this.setState({
                    progress
                })
            }
        }).promise.then(response => {
            // 下载完成后
            this.hideModal()
            if (response.statusCode == 200) {
                // console.log("FILES UPLOADED!") // response.statusCode, response.headers, response.body
                RNUpdateApp.install(this.filePath)

            } else {
                // 提示安装失败，关闭升级窗口
                this.errorTips()
            }

            this.loading = false
        })
            .catch(err => {
                if (err.description == "cancegetFileSizelled") {
                    this.errorTips()
                }
                this.hideModal()
            })
    }


    updateApp = () => {
        // 如果已经开始下载
        if (this.loading) return
        // 如果是android
        if (!isIOS) {
            this.androidUpdate()
            return
        }

        let {url} = this.fetchRes
        // 如果是ios，打开appstore连接
        Linking.openURL(url).catch(err =>
            console.error("An error occurred", err)
        )
    }
    // stopUpdateApp = () => {
    //     this.jobId && RNFS.stopDownload(this.jobId)
    // }
    hideModal = () => {
        this.setState({
            modalVisible: false
        })
        this.jobId && RNFS.stopDownload(this.jobId)
    }

    componentWillUnmount() {
        this.hideModal()
    }

    renderBottom = () => {
        let {progress} = this.state
        let {
            progressBarColor,
            updateBtnHeight,
            updateBoxWidth,
            updateBtnText
        } = this.props
        if (progress > 0 && progress < 1) {
            return (
                <View style={styles.progressBar}>
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            backgroundColor: progressBarColor,
                            height: 3,
                            width: progress * updateBoxWidth,
                        }}
                    />
                    <Text style={styles.updateBtnText}>下载中{parseInt(progress * 100, 10)}%</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={this.updateApp}>
                <View style={styles.updateBtn}>
                    <Text style={styles.updateBtnText}>{progress == 1 ? '安装' : updateBtnText}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderCloseBtn = () => {
        let {closeImage, updateBoxWidth, updateBoxHeight} = this.props
        return (
            <View
                style={{
                    position: "absolute",
                    right: (width - updateBoxWidth) / 2 - 16,
                    top: (height - updateBoxHeight) / 2 - 16,
                    zIndex: 1,
                    width: 32,
                    height: 32,
                    backgroundColor: "#2f90e9",
                    borderRadius: 16
                }}
            >
                <TouchableOpacity
                    onPress={this.hideModal}
                    style={{
                        width: 32,
                        height: 32,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Image
                        source={closeImage}
                        style={{width: 20, height: 20}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderBanner = () => {
        let { bannerImage, bannerWidth, 
              bannerHeight, bannerResizeMode, 
              updateBoxWidth, updateBoxHeight } = this.props
        return (
            <View style={{ 
                height: bannerHeight,
                width: bannerWidth,
                position: "absolute",
                zIndex: 1,
                left: (width - updateBoxWidth) / 2 + bannerWidth / 2 ,
                top: (height - updateBoxHeight) / 2 -  bannerHeight * 0.3,
             }}>
                <Image
                    style={{
                        width: bannerWidth,
                        height: bannerHeight,
                        resizeMode: bannerResizeMode
                    }}
                    source={bannerImage}>
                </Image>
            </View>
        )
    }

    renderFileSize = () => {
        let {fileSize} = this.state
        if (!isIOS) {
            return <Text>文件大小：{fileSize}M</Text>
        }
    }

    render() {
        let {modalVisible, progress, desc, version } = this.state
        let {updateBoxWidth, updateBoxHeight} = this.props
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                }}
            >
                <View style={styles.wrap}>
                    {this.renderBanner()}
                    {this.state.upgradeFlag === 0 ? this.renderCloseBtn() : null}
                    <View
                        style={[
                            styles.innerBox,
                            {width: updateBoxWidth, height: updateBoxHeight}
                        ]}>
                        {/*this.renderBanner()*/}
                        <View style={styles.versionBox}>
                            <Text style={styles.versionText}>{version}版本闪商亮登场,请下载体验</Text>
                        </View>
                        <View style={{ width: updateBoxWidth - 20, flex: 1, marginVertical: 5}}>
                            <ScrollView style={{paddingLeft: 10, paddingRight: 10}}>
                                {this.renderFileSize()}
                                {desc &&
                                desc.map((d, i) => {
                                    return (
                                        <Text style={{ color: '#767676'}} key={i}>{i + 1 + ". " + d}</Text>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        {this.renderBottom()}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    innerBox: {
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#eee",
        overflow: "hidden"
    },
    updateBtn: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        width: 250,
        height: 38,
        alignItems: "center",
        justifyContent: "center"
    },
    updateBtnText: {
        fontSize: 13,
        color: "#f50"
    },
    progressBar: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        width: 250,
        height: 37,
        alignItems: "center",
        justifyContent: 'center',

    },
    versionBox: {
        marginTop: 90,
    },
    versionText: {
        fontSize: 16,
        color: '#2f90e9',
    }

})

export default RNUpdate
