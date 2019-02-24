/*
 * @Author: badx.龙腾归海 
 * @Date: 2018-07-05 14:42:04 
 * @Last Modified by: badx.龙腾归海
 * @Last Modified time: 2018-07-28 14:43:36
 * @Description: 城市列表选择 
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Text,
    Platform,
    Alert,
    TouchableOpacity,
    ListView,
    SectionList,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SECTIONHEIGHT = 30;
const ROWHEIGHT = 40;
const ROWHEIGHT_BOX = 40;
var totalheight = []; //每个字母对应的城市和字母的总高度

const {width, height} = Dimensions.get('window');
// const URL = 'http://xxxxxxxxx.com/api/city/list';

var that;

const key_now = '当前';

export default class CityIndexListView extends Component {

    constructor(props) {
        super(props);
        let ALL_CITY_LIST = this.props.allCityList;
        let CURRENT_CITY_LIST = this.props.nowCityList;

        let dataBlob = {};
        let letters = [];
        let sectionsData = [];
        let totalSize = 0;
        let citySectionSize = [];

        dataBlob[key_now] = CURRENT_CITY_LIST;

        dataBlob = {...dataBlob, ...ALL_CITY_LIST};

        for (const key in dataBlob) {
            if (dataBlob.hasOwnProperty(key)) {
                letters.push(key);
                let section = {};
                section.key = key;
                section.data = dataBlob[key];
                for (let j = 0; j < section.data.length; j++) {
                    section.data[j].key = section.data[j].cityId;
                    section.data[j].rowId = key;
                }
                sectionsData.push(section);
            }
        }
        
        this.state = {
            sectionsData: sectionsData,
            letters: letters,
            sectionSize: citySectionSize
        };
        that = this;

        //console.log(sectionsData);

    }

    _cityNameClick(cityJson) {
        this.props.onSelectCity(cityJson);
    }

    _renderRightLetters(letter, index) {
        return (
            <TouchableOpacity key={'letter_idx_' + index} activeOpacity={0.6} onPress={() => {
                this._scrollTo(index, letter)
            }}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _scrollTo(index, letter) {
        this.refs.list.scrollToLocation({
            //animated: false,
            sectionIndex: index,
            itemIndex: 0,
            viewOffset: 30
        });
    }

    _renderListBox(cityJson, rowId) {
        return (
            <TouchableOpacity key={'list_item_' + cityJson.cityId} style={styles.rowViewBox} onPress={() => {
                that._cityNameClick(cityJson)
            }}>
                <View style={styles.rowdataBox}>
                    <Icon size={20} name='crosshairs-gps' style={{ color: '#106CF7', marginTop: 4,}} />
                    <Text style={styles.rowdatatextBox}>{cityJson.cityName}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderListRow({item}) {
        //console.log(item.cityId);
        if (item.rowId === key_now) {
            return that._renderListBox(item, item.rowId);
        }
        return (
            <TouchableOpacity key={'list_item_' + item.cityId} style={styles.rowView} onPress={() => {
                that._cityNameClick(item)
            }}>
                <View style={styles.rowdata}>
                    <Text style={styles.rowdatatext}>{item.cityName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderListSectionHeader({section}) {
        return (
            <View style={styles.sectionView}>
                <Text style={styles.sectionText}>
                    {section.key}
                </Text>
            </View>
        );
    }

    _renderFooter() {
        return (
            <View style={styles.sectionView}>
                <Text style={[styles.sectionText,{textAlign: 'center'}]}>
                   已经到底部了
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.listContainner}>
                    <SectionList
                        ref='list'
                        initialNumToRender={500}
                        enableEmptySections
                        renderItem={this._renderListRow}
                        renderSectionHeader={this._renderListSectionHeader}
                        sections={this.state.sectionsData}
                        ListFooterComponent={this._renderFooter}
                     />
                    <View style={styles.letters}>
                        {this.state.letters.map((letter, index) => this._renderRightLetters(letter, index))}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F4F4F4',
    },
    listContainner: {
        //flex: 1,
        backgroundColor: '#FFF',
        height: height - 118,
        marginBottom: 5
    },
    
    letters: {
        position: 'absolute',
        height: height,
        top: 0,
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    letter: {
        height: height * 4 / 125,
        width: width * 4 / 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letterText: {
        textAlign: 'center',
        fontSize: height * 1.1 / 50,
        color: '#e75404'
    },
    sectionView: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        paddingLeft: 10,
        width: width,
        backgroundColor: '#F4F4F4'
    },
    sectionText: {
        color: '#e75404',
        fontWeight: 'bold'
    },
    rowView: {
        height: ROWHEIGHT,
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
    },

    rowViewBox: {
        height: ROWHEIGHT_BOX,
        width: (width - 30) / 3,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    rowdataBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DBDBDB',
        marginTop: 5,
        marginBottom: 5,
        paddingBottom: 2,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowdatatextBox: {
        marginTop: 8,
        marginLeft: 8,
        //flex: 1,
        height: 20
    }

});
