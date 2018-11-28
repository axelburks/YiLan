import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import Theme, { ThemeProvider } from '@blankapp/ui';
import I18n, { t } from '@blankapp/plugin-i18n';
import moment from 'moment';
import defaultTheme from '@blankapp/ui/src/resources/themes/default';
import defaultThemePro from '@blankapp/ui-pro/src/resources/themes/default';
import defaultThemeExtend from './resources/themes/default';
import AppNavigator from './navigators/AppNavigator';
import NavigationService from './navigators/NavigationService';
import languages from './resources/locales';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-hk';

I18n.register(languages);
I18n.useLocale('zh-Hans');
moment.locale('zh-cn');

Theme.registerTheme('default', [
  defaultTheme,
  defaultThemePro,
  defaultThemeExtend,
]);

global.alert = (message) => {
  Alert.alert(message, undefined, [
    {
      text: t('globals.buttonOk'),
    },
  ]);
};
class App extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <ThemeProvider>
        <AppNavigator
          ref={(navigatorRef) => {
            this.topLevelNavigator = navigatorRef;
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ThemeProvider>
    );
  }
}

export default App;
