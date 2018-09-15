/** @format */

// import {AppRegistry} from 'react-native';
import { Navigation } from "react-native-navigation";
import {registerScreens} from './src/screens';

// To remove
// import App from './src/App';
// import {name as appName} from './app.json';

registerScreens();

// AppRegistry.registerComponent(appName, () => App);
// Navigation.registerComponent(appName, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    }
  });
});