/**
 * Created by Rabbit on 2017/11/2.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {  Button, NavigationBar, Input, Select  } from 'teaset';
import BoxeMenu from './../../Component/BoxeMenu';

export default class Work extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            menus:[{
                key:0,
                title:"入库",
                //component: Day1,
                isFA: false,
                icon: "inbound",
                size: 50,
                color: "#ff856c",
                hideNav: false,
              },{
                key:1,
                title:"盘点",
                //component: Day2,
                isFA: false,
                icon: "check-bound",
                size:50,
                color:"#90bdc1",
                hideNav: true,
              },{
                key:2,
                title:"库存查询",
                //component: Day3,
                isFA: false,
                icon: "search-bound",
                size:50,
                color:"#2aa2ef",
                hideNav: true,
              },{
                key:3,
                title:"出库",
                //component: Day4,
                isFA: false,
                icon: "outbound",
                size:50,
                color:"#FF9A05",
                hideNav: false,
              },{
                key:4,
                title:"返回",
                //component: Day5,
                isFA: true,
                icon: "undo",
                size:50,
                color:"#00D204",
                hideNav: false,
              }]
        };
    }

    componentDidMount() {
        isLogin().then((token) => {
            if(token) {
                SplashScreen.hide();
            }
        })
    }    

    render() {
        let boxs = this.state.menus.map(function(elem, index) {
            console.log(elem);
            return(
              <BoxeMenu data={elem} index={index} key={index}/>
            );
        })
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.title}
                    titleStyle={styles.headerTitle}
                    type='ios'
                    style={{height:64,backgroundColor:'#ff7000'}}
                    statusBarStyle='default'
                />
               
                <ScrollView style={styles.mainView}>
                <View style={styles.touchBoxContainer}>
                    {boxs}
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontSize: FONT_SIZE(20),
        textAlign: "center",
    },
    mainView:{
        marginTop:px2dp(128),
    },
    touchBoxContainer:{
        flexDirection: "row", 
        flexWrap:"wrap",
        width: SCREEN_WIDTH,
        borderTopWidth: pixel,
        borderTopColor:"#ccc",
        borderLeftWidth: pixel,
        borderLeftColor:"#ccc",
        borderRightWidth: pixel,
        borderRightColor:"#ccc",
    },
});