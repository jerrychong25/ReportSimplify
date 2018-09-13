/** @format */

// import {AppRegistry} from 'react-native';
import { Navigation } from "react-native-navigation";
import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(appName, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: appName
      }
    }
  });
});