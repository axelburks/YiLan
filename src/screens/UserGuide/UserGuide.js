import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Screen } from '@blankapp/ui';
import Lang from '../../utilities/Lang';

class UserGuide extends Component {
  static navigationOptions = {
    title: Lang.get('screens.userGuide.title'),
  };

  constructor(props) {
    super(props);

    this.state = {
      homepageUrl: 'https://yilan.thecode.me',
    };
  }
  render() {
    return (
      <Screen>
        <WebView
          source={{ uri: this.state.homepageUrl }}
        />
      </Screen>
    );
  }
}

export default UserGuide;
