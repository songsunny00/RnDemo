/**
 * Created by Rabbit 下午6:40
 */

import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
                                                           
const TabIcon = (props) => {
    // console.log(props);
    return(
        <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>   
            <Icon name={props.imageIcon} size={30} 
                  color={props.tintColor}/>
            <Text
                style={{color:props.tintColor,marginTop:px2dp(3),fontSize:FONT_SIZE(12)}}
            >
                {props.title}
            </Text>
        </View>
    )
};


export default TabIcon;