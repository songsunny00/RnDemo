/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-06-18 17:25:47 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-10 17:08:01
 * @Description: 城市列表 
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import { Button, NavigationBar, Input, Label } from 'teaset';
import { observer, inject } from 'mobx-react/native';

import SearchBox from '../../Component/CityListPicker/SearchBox';
import SearchResult from '../../Component/CityListPicker/SearchResult';
import CityList from '../../Component/CityListPicker/IndexListView';
import CityData from '../../Component/CityListPicker/CityData';

@inject(["userStore"],["locationStore"]) // 注入对应的store
@observer
export default class CityPicker extends Component {
    constructor(props) {
        super(props);
        this.locationStore = this.props.locationStore; //通过props来导入访问已注入的store
        this.userStore = this.props.userStore; //通过props来导入访问已注入的store
        this.state = {
            showSearchResult: false,
            keyword: '',
            searchResultList: [],
            allCityList: CityData
        };
    }

    onChanegeTextKeyword(newVal) {
        // alert(newVal);
        if (newVal === '') {
            this.setState({ showSearchResult: false });
        } else {
            // 在这里过滤数据结果
            let dataList = this.locationStore.filterCityData(newVal);

            this.setState({ keyword: newVal, showSearchResult: true, searchResultList: dataList });
        }
    }

    onSelectCity(cityJson) {
        if (this.state.showSearchResult) {
            this.setState({ showSearchResult: false, keyword: '' });
        }
        //alert('你选择了城市====》' + cityJson.cityId + '#####' + cityJson.cityName);
        this.userStore.getWorkCity(cityJson);
        Actions.pop();
    }
    
    render() {
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
                <View style={{ backgroundColor: 'white', marginTop: px2dp(128) }}>
                    <SearchBox
                        keyword={this.state.keyword}
                        onChanegeTextKeyword={(vv) => {
                            this.onChanegeTextKeyword(vv)
                        }} />
                        {
                            this.state.showSearchResult
                        ?
                            <SearchResult
                                keyword={this.state.keyword}
                                onSelectCity={this.onSelectCity.bind(this)}
                                searchResultList={this.state.searchResultList} />

                        :
                            <CityList
                                onSelectCity={this.onSelectCity.bind(this)}
                                allCityList={this.state.allCityList}
                                nowCityList={this.locationStore.nowCityList.slice()} />

                        }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});