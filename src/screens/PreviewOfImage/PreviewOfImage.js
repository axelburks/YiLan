import React, { Component } from 'react';
import { Screen } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import FastImage from 'react-native-fast-image';
import SupportedFileTypes from './SupportedFileTypes';

class PreviewOfImage extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfImage.title'),
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
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });

    setTimeout(async () => { await this.reloadData(); }, 100);
  }

  reloadData() {

  }

  render() {
    const { filePath } = this.state;

    const imageSource = { uri: filePath };
    return (
      <Screen>
        <FastImage
          style={{
            backgroundColor: '#000000',
            width: '100%',
            height: '100%',
          }}
          source={imageSource}
          resizeMode="contain"
        />
      </Screen>
    );
  }
}

PreviewOfImage.SupportedFileTypes = SupportedFileTypes;

export default PreviewOfImage;
