/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-27 11:46:19 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-28 14:44:12
 * @Description: 统一的弹框 
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    TextInput
} from 'react-native';

const { height, width } = Dimensions.get('window');

const propTypes = {
    //iconName: PropTypes.string.isRequired,
    
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,

    title: PropTypes.string.isRequired,
    titleTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

    detailText: PropTypes.string,
    detailTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

    confirmText: PropTypes.string,
    confirmTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    confirmButtonStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

    cancelText: PropTypes.string,
    cancelTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    cancelButtonStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

    backgroundColor: PropTypes.string,

    containerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

    springFromBottom: PropTypes.bool,
    springFromTop: PropTypes.bool,

    type: PropTypes.string,

    textInputStyle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        PropTypes.array
    ]),

    zIndex: PropTypes.number, // try and avoid this.  only needed if you used zIndex elsewhere

};

export default class Alert extends Component {
    static defaultProps = {
        type: "alert" //alert | prompt
    };

    constructor(props) {
        super(props);

        this.state = {
            promptValue: ""
        };
    };


    renderText() {
        if (this.props.detailText) {
            return (
                <Text style={[{
                    marginBottom: px2dp(10)
                }, this.props.detailTextStyle]}>
                    {this.props.detailText}
                </Text>
            )
        }
    };

    render() {
        return (
            <View style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    width: width * 0.8,
                    height: width * 0.4,
                    flexDirection: 'column',
                    paddingTop: px2dp(12)
                }}>
                <View style={{
                    borderBottomWidth: px2dp(1),
                    borderColor: "#E8E8EA",
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'center',
                    paddingBottom: px2dp(10),
                }}>
                    <Icon size={20} name={'alert'} style={{ marginHorizontal: px2dp(5), color: 'red'}} />
                    <Text style={[{
                        fontSize: FONT_SIZE(16),
                        fontWeight: '500',
                        //marginBottom: 10,
                        textAlign: 'center',
                        color: '#666',
                    }, this.props.titleTextStyle]}>
                        {this.props.title}
                    </Text>
                </View>
                   
                <View style={{
                    borderBottomWidth: px2dp(1),
                    borderColor: "#E8E8EA",
                    minHeight: width * 0.16,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    width: width * 0.8,
                    //backgroundColor: '#000',
                    paddingHorizontal: px2dp(10)
                }}>
                    <Text>{this.renderText()}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        paddingLeft: 10
                    }}>
                        <TouchableOpacity
                            style={[{
                                padding: px2dp(20),
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                marginRight: px2dp(4),
                                marginBottom: px2dp(4),
                                borderColor: '#E8E8EA'
                            }, this.props.confirmButtonStyle]}
                            onPress={
                                this.props.onConfirm
                            }>
                            <Text style={[{
                                color: '#666',
                                fontWeight: '700',
                            }, this.props.confirmTextStyle]}>
                                {(this.props.confirmText) ? this.props.confirmText : '确定'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <TouchableOpacity
                            style={[{
                                padding: px2dp(20),
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                marginLeft: px2dp(4),
                                marginBottom: px2dp(4),
                                borderRightWidth: px2dp(1),
                                borderColor: '#E8E8EA'
                            }, this.props.cancelButtonStyle]}
                            onPress={
                                this.props.onCancel
                            }>
                            <Text style={[{
                                color: '#666',
                                fontWeight: '700'
                            }, this.props.cancelTextStyle]}>
                                {(this.props.cancelText) ? this.props.cancelText : '取消'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

};

Alert.propTypes = propTypes;