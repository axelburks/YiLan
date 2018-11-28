import React, { Component } from 'react';
import { Screen } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import RNFetchBlob from 'rn-fetch-blob';
import jschardet from 'jschardet';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { MonacoEditor } from '../../components';
import {
  ProgressHUD,
} from '../../modules';
import SupportedFileTypes from './SupportedFileTypes';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class PreviewOfCode extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfCode.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    const fileName = this.navigation.getParam('extraFileName');
    const filePath = this.navigation.getParam('extraFilePath');

    this.state = {
      loading: true,
      fileName,
      filePath,
      codeLanguage: 'plaintext',
      codeContent: '',
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });

    setTimeout(async () => { await this.reloadData(); }, 100);
  }

  async reloadData() {
    const {
      fileName,
      filePath,
    } = this.state;

    let codeLanguage = 'plaintext';
    let codeContent;

    try {
      const fileExtension = fileName.substr(fileName.lastIndexOf('.'));
      const fileType = SupportedFileTypes
        .find((item) => {
          const fileNames = item.names || [];
          const fileExtensions = item.extensions || [];
          return fileNames.includes(fileName) || fileExtensions.includes(fileExtension);
        });
      codeContent = await this.readFileUtf8OrAscii(filePath);

      if (fileType) {
        codeLanguage = fileType.id;
      }

      this.setState({
        loading: false,
        codeLanguage,
        codeContent,
      });
    } catch (error) {
      this.setState({ loading: false });
      ProgressHUD.showError(error.message);
      ProgressHUD.dismiss(1500);
    }
  }

  readFileUtf8OrAscii(filePath) {
    return new Promise((resolve, reject) => {
      fs.exists(filePath)
        .then(() => {
          fs.readFile(filePath)
            .then((data) => {
              const detectResult = jschardet.detect(data);
              if (detectResult.encoding === 'ascii') {
                resolve(JSON.stringify(data));
                return;
              }
              if (!detectResult.encoding) {
                reject(new Error('Unknown encoding'));
                return;
              }

              fs.readStream(filePath, 'ascii')
                .then((stream) => {
                  let chunks = [];
                  stream.open();
                  stream.onData((chunk) => {
                    chunks = [...chunks, ...chunk];
                  });
                  stream.onEnd(() => {
                    const decodedText = iconv.decode(Buffer.from(chunks), detectResult.encoding);
                    resolve(JSON.stringify(decodedText));
                  });
                })
                .catch(e => reject(e));
            })
            .catch(e => reject(e));
        })
        .catch(e => reject(e));
    });
  }

  render() {
    const {
      loading,
      codeLanguage,
      codeContent,
    } = this.state;
    if (loading) return <Screen />;

    return (
      <Screen>
        <MonacoEditor
          ref={(ref) => {
            this.editor = ref;
          }}
          style={{
            flex: 1,
          }}
          value={codeContent}
          language={codeLanguage}
          readOnly
          onRelay
        />
      </Screen>
    );
  }
}

PreviewOfCode.SupportedFileTypes = SupportedFileTypes;

export default PreviewOfCode;
