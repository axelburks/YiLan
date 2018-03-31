import React from 'react';
import { StackNavigator } from 'react-navigation';
import PreviewExtension from '../modules/PreviewExtension';
import AppBar from '../components/AppBar';
import IconNames from '../components/Icon/IconNames';

import ArchivePreviewer from '../screens/ArchivePreviewer';
import CodePreviewer from '../screens/CodePreviewer';
import Home from '../screens/Home';
import HtmlPreviewer from '../screens/HtmlPreviewer';
import Initialize from '../screens/Initialize';
import MarkdownPreviewer from '../screens/MarkdownPreviewer';
import PdfPreviewer from '../screens/PdfPreviewer';
import Settings from '../screens/Settings';
import Unsupported from '../screens/Unsupported';
import UserGuide from '../screens/UserGuide';

const routeConfigMap = {
  ArchivePreviewer: {
    screen: ArchivePreviewer,
  },
  CodePreviewer: {
    screen: CodePreviewer,
  },
  Home: {
    screen: Home,
  },
  HtmlPreviewer: {
    screen: HtmlPreviewer,
  },
  Initialize: {
    screen: Initialize,
  },
  MarkdownPreviewer: {
    screen: MarkdownPreviewer,
  },
  PdfPreviewer: {
    screen: PdfPreviewer,
  },
  Settings: {
    screen: Settings,
  },
  Unsupported: {
    screen: Unsupported,
  },
  UserGuide: {
    screen: UserGuide,
  },
};
const stackConfig = {
  initialRouteName: 'Initialize',
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => {
    const { routeName, params } = navigation.state;

    if (PreviewExtension && (params && params.from === 'extension')) {
      return {
        headerLeft: (
          <AppBar.IconButton
            name={IconNames.MenuClose}
            onPress={() => {
              PreviewExtension.completeRequest();
            }}
          />
        ),
      };
    }
    if (routeName === 'Home') {
      return { headerLeft: null };
    }
    return {
      headerLeft: (
        <AppBar.BackButton
          onPress={() => navigation.goBack()}
        />
      ),
    };
  },
};

const AppNavigator = StackNavigator(routeConfigMap, stackConfig);

export default AppNavigator;
