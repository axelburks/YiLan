import React, { Component } from 'react';
import { Screen, Text } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';

class Example extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: t('screens.example.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;
  }

  render() {
    return (
      <Screen>
        <Text>
          Example
        </Text>
      </Screen>
    );
  }
}

export default Example;
