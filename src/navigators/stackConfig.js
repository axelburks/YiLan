import React from 'react';
import { AppBar } from '@blankapp/ui-pro';
import PreviewExtension from '../modules/PreviewExtension';

const stackConfig = {
  initialRouteName: 'Initialize',
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => {
    let headerLeft;
    const {
      params,
    } = navigation.state;

    if (PreviewExtension && (params && params.from === 'extension')) {
      headerLeft = (
        <AppBar.IconButton
          iconName="close"
          onPress={() => {
            PreviewExtension.completeRequest();
          }}
        />
      );
    }
    return {
      header: props => <AppBar {...props} />,
      headerTitle: props => <AppBar.Title numberOfLines={1} {...props} />,
      headerLeft,
    };
  },
};

export default stackConfig;
