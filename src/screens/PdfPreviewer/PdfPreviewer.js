import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, Screen } from '@blankapp/ui';
import Pdf from 'react-native-pdf';
import Lang from '../../utilities/Lang';
import SupportedFileTypes from './SupportedFileTypes';

class PdfPreviewer extends Component {
  static navigationOptions = {
    title: Lang.get('screens.pdfPreviewer.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    this.state = {
      loading: true,
    };
  }

  render() {
    const {
      // extraFileName: fileName,
      extraFilePath: filePath,
    } = this.navigationParams;

    const pdfSource = { uri: filePath };
    return (
      <Screen>
        <Pdf
          source={pdfSource}
          onLoadComplete={() => {
            this.setState({ loading: false });
          }}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
          }}
        />
        {
          !this.state.loading ? null :
          (
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 120,
              }}
            />
          )
        }
      </Screen>
    );
  }
}

PdfPreviewer.SupportedFileTypes = SupportedFileTypes;

export default PdfPreviewer;
