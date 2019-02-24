/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-07-05 14:42:58 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-10 14:52:00
 * @Description: 城市列表组件 
 */
'use strict';
import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    NavigatorIOS,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';

import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

import CityList from './IndexListView';

// 下面是数据部分
//import DATA_JSON from './city-list.json';
import DATA_JSON from './CityData';

const NOW_CITY_LIST = [
    {
        cityId: '279',
        cityName: '阿坝',
        cityNameEn: 'Aba',
    }
];

const ALL_CITY_LIST = DATA_JSON;

export default class SimpleSelectCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchResult: false,
            keyword: '',
            searchResultList: [],
            allCityList: ALL_CITY_LIST,
            nowCityList: NOW_CITY_LIST
        };
    }

    onChanegeTextKeyword(newVal) {
        // alert(newVal);
        if (newVal === '') {
            this.setState({showSearchResult: false});
        } else {
            // 在这里过滤数据结果
            let dataList = this.filterCityData(newVal);

            this.setState({keyword:newVal, showSearchResult: true, searchResultList: dataList});
        }
    }

    filterCityData(text) {
        //console.log('search for list', text);
        text = text.toLowerCase();
        let rst = [];
        let citys = Object.values(ALL_CITY_LIST);
        for (let idx = 0; idx < citys.length; idx++) {
            let item = citys[idx];
            for (let i = 0; i < item.length; i++) {
                if ((item[i].cityName.toLowerCase()).indexOf(text) === 0 || (item[i].cityNameEn.toLowerCase()).indexOf(text) === 0) {
                    rst.push(item[i]);
                }
            }
        }
        return rst;
    }

    onSelectCity(cityJson) {
        if (this.state.showSearchResult) {
            this.setState({showSearchResult: false, keyword:''});
        }
        alert('你选择了城市====》' + cityJson.cityId + '#####' + cityJson.cityName);
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBox
                    keyword={this.state.keyword}
                    onChanegeTextKeyword={(vv) => {
                    this.onChanegeTextKeyword(vv)
                }}/>
                {this.state.showSearchResult
                    ? 
                    <SearchResult
                        keyword={this.state.keyword}
                        onSelectCity={this.onSelectCity.bind(this)}
                        searchResultList={this.state.searchResultList}/>
                    
                    :    
                    <CityList
                        onSelectCity={this.onSelectCity.bind(this)}
                        allCityList={this.state.allCityList}
                        hotCityList={this.state.hotCityList}
                        lastVisitCityList={this.state.lastVisitCityList}
                        nowCityList={this.state.nowCityList}/>
                       
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        //marginTop: px2dp(130),
    },
});
