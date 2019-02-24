/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-13 14:45:08 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-07 19:32:54
 * @Description: 倒计时按钮 
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    StyleSheet,
    View,
    ViewPropTypes,
    TouchableOpacity,
} from 'react-native';


export default class TimerButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: true,
        };
        this.shouldStartCountting = this.shouldStartCountting.bind(this)
        this.countDownAction = this.countDownAction.bind(this)
    }

    static propTypes = {
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        onClick: PropTypes.func,
        disableColor: PropTypes.string,
        timerTitle: PropTypes.string,
        enable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
    };

    countDownAction() {
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            } else {
                this.setState({
                    timerCount: timer,
                    timerTitle: `重新获取(${timer}s)`,
                })
            }
        }, 1000)
    }

    shouldStartCountting(shouldStart) {
        if (this.state.counting) {
            return
        }
        if (shouldStart) {
            this.countDownAction()
            this.setState({ counting: true, selfEnable: false })
        } else {
            this.setState({ selfEnable: true })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { onClick, style, textStyle, disableColor } = this.props;
        const { counting, timerTitle, selfEnable } = this.state;
        return (
            <TouchableOpacity activeOpacity={counting ? 1 : 0.8} onPress={() => {
                if (!counting && selfEnable) {
                    this.setState({ selfEnable: false });
                    this.shouldStartCountting(true);
                    onClick();
                };
            }}>
                <View
                    style={[styles.styleCodeView, style]}>
                    <Text
                        style={[{ fontSize: 12 }, textStyle, { color: ((!counting && selfEnable) ? textStyle.color : disableColor || 'gray') }]}>{timerTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    styleCodeView: {
        height: 28,
        width: SCREEN_WIDTH * 0.22,
        borderColor: '#dc1466',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleTextCode: {
        fontSize: 12,
        color: '#dc1466',
        textAlign: 'center',
    },

});