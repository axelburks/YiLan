import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Divider,
  Screen,
} from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import { ListEmptyIndicator } from '../../components';

class PreviewOfPlainText extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfPlainText.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    // const type = this.navigation.getParam('type');
    const fileName = this.navigation.getParam('extraFileName');
    // const filePath = this.navigation.getParam('extraFilePath');

    this.state = {
      // type,
      fileName,
      // filePath,
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });

    setTimeout(async () => { await this.reloadData(); }, 100);
  }

  renderListEmpty() {
    return (
      <ListEmptyIndicator
        title={t('screens.previewOfPlainText.messageListEmptyTitle')}
        message={t('screens.previewOfPlainText.messageListEmptyMessage')}
      />
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

export default PreviewOfPlainText;
