

import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Input,
    Label
} from 'teaset';

const NoData = () => {
    return (
        <View>
            <View style={styles.containerNoData}>
                <Icon size={30} name='truck' />
                <Label type="title" style={styles.title}>{`暂无数据`}</Label>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    containerNoData:{
        alignItems: 'center',
        marginTop:px2dp(20)
    },
    title:{
        color:Color.grep,
        marginTop:px2dp(20)
    }
});

export default NoData;