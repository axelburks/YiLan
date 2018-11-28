import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, Screen } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import Pdf from 'react-native-pdf';
import { PreviewExtension } from '../../modules';
import { UnsafeModeView } from '../../views';
import SupportedFileTypes from './SupportedFileTypes';

class PreviewOfPdf extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfPdf.title'),
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
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });
  }

  render() {
    const {
      allowUnsafeMode,
      filePath,
    } = this.state;

    if (!allowUnsafeMode) {
      return (
        <UnsafeModeView
          onContinue={() => this.setState({ allowUnsafeMode: true })}
        />
      );
    }

    return (
      <Screen>
        <Pdf
          source={{ uri: filePath }}
          activityIndicator={(
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 120,
              }}
            />
          )}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            backgroundColor: '#F7F7F9',
          }}
        />
      </Screen>
    );
  }
}

PreviewOfPdf.SupportedFileTypes = SupportedFileTypes;

export default PreviewOfPdf;
