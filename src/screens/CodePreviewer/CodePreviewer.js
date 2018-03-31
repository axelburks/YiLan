import React, { Component } from 'react';
import { ActivityIndicator, Screen } from '@blankapp/ui';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import jschardet from 'jschardet';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { MonacoEditor } from '../../components';
import Lang from '../../utilities/Lang';
import SupportedFileTypes from './SupportedFileTypes';

class CodePreviewer extends Component {
  static navigationOptions = {
    title: Lang.get('screens.codePreviewer.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    this.state = {
      loading: true,
      language: '',
      value: '',
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      const {
        extraFileName: fileName,
        extraFilePath: filePath,
      } = this.navigationParams;

      let language = 'plaintext';
      let value;

      try {
        const fileExtension = fileName.substr(fileName.lastIndexOf('.'));
        const fileType = SupportedFileTypes
          .find((item) => {
            const fileNames = item.names || [];
            const fileExtensions = item.extensions || [];
            return fileNames.includes(fileName) || fileExtensions.includes(fileExtension);
          });
        const text = await this.readFileUtf8OrAscii(filePath);

        if (fileType) {
          language = fileType.id;
        }
        value = JSON.stringify(text);
      } catch (error) {
        alert(error.message);
      } finally {
        this.setState({
          loading: false,
          language,
          value,
        });
      }
    });
  }

  readFileUtf8OrAscii(filePath) {
    return new Promise((resolve, reject) => {
      RNFS.readFile(filePath, 'utf8')
        .then((string) => {
          resolve(string);
        })
        .catch((error1) => {
          console.log(error1); // eslint-disable-line
          RNFS.readFile(filePath, 'ascii')
            .then((string) => {
              const detectResult = jschardet.detect(string);
              if (!detectResult.encoding) {
                reject(new Error('Unknown encoding'));
                return;
              }
              RNFetchBlob.fs.readStream(filePath, 'ascii')
                .then((stream) => {
                  let chunks = [];
                  stream.open();
                  stream.onData((chunk) => {
                    chunks = [...chunks, ...chunk];
                  });
                  stream.onEnd(() => {
                    const text2 = iconv.decode(Buffer.from(chunks), detectResult.encoding);
                    resolve(text2);
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            })
            .catch(error2 => reject(error2));
        });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Screen
          style={{
            alignItems: 'center',
            padding: 120,
          }}
        >
          <ActivityIndicator />
        </Screen>
      );
    }
    return (
      <Screen>
        <MonacoEditor
          ref={(ref) => {
            this.editor = ref;
          }}
          style={{
            flex: 1,
          }}
          value={this.state.value}
          language={this.state.language}
          readOnly
          onRelay
        />
      </Screen>
    );
  }
}

CodePreviewer.SupportedFileTypes = SupportedFileTypes;

export default CodePreviewer;
