/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-07-05 14:42:42 
 * @Last Modified by: badx.龙腾归海 
 * @Last Modified time: 2018-07-05 14:42:42 
 * @Description: 城市列表所属结果 
 */
'use strict';
import React, {Component} from 'react';
import {
    Alert,
    View,
    FlatList,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NavigatorIOS,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

var that = null;

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        that = this;
    }

    _cityNameClick(cityJson) {
        // console.log()
        that.props.onSelectCity(cityJson);
    }

    renderRow({item}) {
        let keyword = this.props.keyword.toLowerCase();
        
        let KK = (
            <Text style={{
                color: 'red'
            }}>{keyword}</Text>
        );

        let Name1 = '';
        if ((item.cityName.toLowerCase()).indexOf(keyword) === 0) {
            Name1 = (<Text>{KK}{item.cityName.replace(keyword,'')}</Text>);
        } else {
            Name1 = (<Text>{item.cityName}</Text>);
        }

        let Name2 = '';
        if ((item.cityNameEn.toLowerCase()).indexOf(keyword) === 0) {
            Name2 = (<Text>{KK}{item.cityNameEn.replace(keyword,'')}</Text>);
        } else {
            Name2 = (
                <Text>{item.cityNameEn}</Text>
            );
        }

       //console.log(Name1, Name2);

        return (
            <TouchableOpacity
                key={'list_item_' + item.cityId}
                style={styles.rowView}
                onPress={() => {
                that._cityNameClick(item)
            }}>
                <View style={styles.rowdata}>
                    <Text style={styles.rowdatatext}>{Name1} / {Name2}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {

        console.log(this.props.searchResultList);

        return (
            <FlatList
                style={styles.contentContainer}
                data={this.props.searchResultList}
                renderItem={this.renderRow.bind(this)} />
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },
    rowView: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#F4F4F4',
        borderBottomWidth: 0.5
    },
    rowdata: {
        paddingTop: 10,
        paddingBottom: 2
    },

    rowdatatext: {
        color: 'gray',
        width: width
    }
});
