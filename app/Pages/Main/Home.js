
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import NoData from "../../Component/NoData";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
import { TabBar, SearchBar, Flex, Button } from 'antd-mobile-rn';
import { Color } from '../../Common/MyStyle';
import Order from './Order';

@inject(["orderStore"], ["userStore"]) // 注入对应的store
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.userStore;
        this.state = {
            selectedTab: 'homeTab',
        };
    }

    componentDidMount() {
        SplashScreen.hide();
    }
    renderContent(pageText: any) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton />
                <View style={{ flex: 1, alignItems: 'center',marginTop:px2dp(250)}}>
                    <Flex style={styles.flexWrap}>
                        <Flex.Item>
                            <Button type="primary" style={styles.button}>一键叫车</Button>
                        </Flex.Item>
                    </Flex>
                    <Flex style={[styles.flexWrap,{marginTop:px2dp(0)}]}>
                        <Flex.Item style={{ paddingBottom: 4 }}>
                            <Button type="warning" style={styles.button}>拼车</Button>
                        </Flex.Item>
                    </Flex>
                </View>
            </View>
        );
    }

    onChangeTab(tabName: any) {
        this.setState({
            selectedTab: tabName,
        });
    }
    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor={Color.primary}
                barTintColor="#fafafa"
            >
                <TabBar.Item
                    title="首页"
                    icon={Images.Home}
                    selectedIcon={Images.Home_active}
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => this.onChangeTab('homeTab')}
                >
                    {this.renderContent('首页')}
                </TabBar.Item>
                <TabBar.Item
                    icon={Images.Order}
                    selectedIcon={Images.Order_active}
                    title="订单"
                    selected={this.state.selectedTab === 'orderTab'}
                    onPress={() => this.onChangeTab('orderTab')}
                >
                    <Order />
                </TabBar.Item>
                <TabBar.Item
                    icon={Images.Message}
                    selectedIcon={Images.Message_active}
                    title="信息"
                    selected={this.state.selectedTab === 'messageTab'}
                    onPress={() => this.onChangeTab('messageTab')}
                >
                    {this.renderContent('信息')}
                </TabBar.Item>
                <TabBar.Item
                    icon={Images.Person}
                    selectedIcon={Images.Person_active}
                    title="我的"
                    selected={this.state.selectedTab === 'personTab'}
                    onPress={() => this.onChangeTab('personTab')}
                >
                    {this.renderContent('My Tab')}
                </TabBar.Item>
            </TabBar>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    flexWrap:{
        padding:px2dp(50)
    },
    button:{
        height:px2dp(120)
    }
});