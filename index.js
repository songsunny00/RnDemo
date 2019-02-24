import { AppRegistry } from 'react-native';
import './app/Common/SetTheme'
import './app/Common/Global'

import App from './App';

// console.ignoredYellowBox = ['Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
//     'source.uri should not be an empty string','Remote debugger is in a background tab which',
//     'Setting a timer',
//     'Encountered two children with the same key,',
//     'Attempt to read an array index',
//     '[mobx] There are multiple mobx instances active. This might lead to unexpected results. See https://github.com/mobxjs/mobx/issues/1082 for details.',
// ];
//发布的时候禁用
console.disableYellowBox = true;

AppRegistry.registerComponent('hjxStore', () => App);
