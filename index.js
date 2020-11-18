/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import List from './components/List';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => List);
