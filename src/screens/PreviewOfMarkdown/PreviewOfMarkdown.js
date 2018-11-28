import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Screen } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import RNFetchBlob from 'rn-fetch-blob';
import Markdown from 'react-native-markdown-renderer';
import {
  ProgressHUD,
} from '../../modules';
import SupportedFileTypes from './SupportedFileTypes';
import customMarkdownStyle from './customMarkdownStyle';
import { ifIphoneX } from '../../utilities/iphone-x-helper';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class PreviewOfMarkdown extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfMarkdown.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    const fileName = this.navigation.getParam('extraFileName');
    const filePath = this.navigation.getParam('extraFilePath');

    this.state = {
      fileName,
      filePath,
      text: '',
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
      const text = await fs.readFile(filePath, 'utf8');
      this.setState({ text });
    } catch (error) {
      ProgressHUD.showError(error.message);
      ProgressHUD.dismiss(1500);
    }
  }

  render() {
    const { text } = this.state;
    return (
      <Screen>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: ifIphoneX(34, 0),
          }}
        >
          <Markdown
            style={customMarkdownStyle}
          >
            {text}
          </Markdown>
        </ScrollView>
      </Screen>
    );
  }
}

PreviewOfMarkdown.SupportedFileTypes = SupportedFileTypes;

export default PreviewOfMarkdown;
