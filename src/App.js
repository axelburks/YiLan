import React, { Component } from 'react';
import { Alert, Platform, StatusBar } from 'react-native';
import Theme, { ThemeProvider } from '@blankapp/ui';
import AppNavigator from './navigators/AppNavigator';
import defaultTheme from './resources/themes/default';

Theme.registerDefaultTheme(defaultTheme);

alert = (text) => {
  setTimeout(() => {
    Alert.alert(
      text,
      undefined,
      undefined,
      { cancelable: false },
    );
  }, 200);
};

class App extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)');
    }
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}

export default App;
