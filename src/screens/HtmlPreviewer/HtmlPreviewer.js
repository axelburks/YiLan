import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Screen } from '@blankapp/ui';
import Lang from '../../utilities/Lang';
import SupportedFileTypes from './SupportedFileTypes';

class HtmlPreviewer extends Component {
  static navigationOptions = {
    title: Lang.get('screens.htmlPreviewer.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    // this.state = {
    //   loading: true,
    // };
  }

  render() {
    const {
      // extraFileName: fileName,
      extraFilePath: filePath,
    } = this.navigationParams;

    const htmlSource = { uri: filePath };
    return (
      <Screen>
        <WebView
          source={htmlSource}
        />
      </Screen>
    );
  }
}

HtmlPreviewer.SupportedFileTypes = SupportedFileTypes;

export default HtmlPreviewer;
