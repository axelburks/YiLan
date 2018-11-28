import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

if (__DEV__) {
  YellowBox.ignoreWarnings(['Require cycle:']);
}

AppRegistry.registerComponent('YiLan', () => App);
