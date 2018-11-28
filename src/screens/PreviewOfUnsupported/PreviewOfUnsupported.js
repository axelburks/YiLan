import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Button,
  Divider,
  Screen,
  View,
} from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import { ListEmptyIndicator } from '../../components';
import NavigationService from '../../navigators/NavigationService';

class PreviewOfUnsupported extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfUnsupported.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    this.handlePressPreviewInPreviewOfCode = this.handlePressPreviewInPreviewOfCode.bind(this);

    const type = this.navigation.getParam('type');
    const fileName = this.navigation.getParam('extraFileName');
    // const filePath = this.navigation.getParam('extraFilePath');

    this.state = {
      type,
      fileName,
      // filePath,
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });
  }

  handlePressPreviewInPreviewOfCode() {
    NavigationService.navigate('PreviewOfCode', this.navigationParams);
  }

  renderListEmpty() {
    const { type } = this.state;
    return (
      <ListEmptyIndicator
        title={t('screens.previewOfUnsupported.messageListEmptyTitle')}
        message={t('screens.previewOfUnsupported.messageListEmptyMessage')}
      >
        {
          type !== 'file' ? null : (
            <View
              style={{
                width: '100%',
              }}
            >
              <Button
                style={{
                  marginLeft: 60,
                  marginRight: 60,
                }}
                text={t('screens.previewOfUnsupported.buttonPreviewInPreviewOfCode')}
                onPress={this.handlePressPreviewInPreviewOfCode}
              />
            </View>
          )
        }
      </ListEmptyIndicator>
    );
  }

  render() {
    return (
      <Screen>
        <FlatList
          data={[]}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => this.renderListEmpty()}
        />
      </Screen>
    );
  }
}

export default PreviewOfUnsupported;
