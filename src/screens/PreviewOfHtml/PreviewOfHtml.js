import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Screen } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import RNFetchBlob from 'rn-fetch-blob';
import {
  PreviewExtension,
  ProgressHUD,
} from '../../modules';
import { UnsafeModeView } from '../../views';
import SupportedFileTypes from './SupportedFileTypes';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class PreviewOfHtml extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfHtml.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    const fileName = this.navigation.getParam('extraFileName');
    const filePath = this.navigation.getParam('extraFilePath');

    this.state = {
      allowUnsafeMode: !PreviewExtension,
      fileName,
      filePath,
      html: '',
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });

    setTimeout(async () => { await this.reloadData(); }, 100);
  }

  async reloadData() {
    const {
      filePath,
    } = this.state;

    try {
      const html = await fs.readFile(filePath, 'utf8');
      this.setState({ html });
    } catch (error) {
      ProgressHUD.showError(error.message);
      ProgressHUD.dismiss(1500);
    }
  }

  render() {
    const {
      allowUnsafeMode,
      html,
    } = this.state;

    if (!allowUnsafeMode) {
      return (
        <UnsafeModeView
          onContinue={() => this.setState({ allowUnsafeMode: true })}
        />
      );
    }

    const htmlSource = { html };
    return (
      <Screen>
        <WebView
          source={htmlSource}
        />
      </Screen>
    );
  }
}

PreviewOfHtml.SupportedFileTypes = SupportedFileTypes;

export default PreviewOfHtml;
