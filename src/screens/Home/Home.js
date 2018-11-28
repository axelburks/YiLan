import React, { Component } from 'react';
import { AppState, DeviceEventEmitter, FlatList } from 'react-native';
import {
  ListItem,
  Screen,
} from '@blankapp/ui';
import { AppBar } from '@blankapp/ui-pro';
import { t } from '@blankapp/plugin-i18n';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import {
  FileIcon,
  ListEmptyIndicator,
} from '../../components';
import {
  ProgressHUD,
} from '../../modules';
import NavigationService from '../../navigators/NavigationService';
import { APP_GROUP } from '../../utilities/constants';
import resolveRouteAndParams from '../../utilities/resolveRouteAndParams';
import { ifIphoneX } from '../../utilities/iphone-x-helper';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerRight = (
      <AppBar.IconButton
        iconName="settings"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    );
    return {
      title: t('screens.home.title'),
      headerRight,
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    this.reloadData = this.reloadData.bind(this);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleAppSettingsChange = this.handleAppSettingsChange.bind(this);
    this.handlePressItem = this.handlePressItem.bind(this);
    this.renderListEmpty = this.renderListEmpty.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      loading: true,
      itemsSource: [],
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    DeviceEventEmitter.addListener('appSettingsDidChange', this.handleAppSettingsChange);

    setTimeout(async () => {
      await this.reloadData();
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    DeviceEventEmitter.removeListener('appSettingsDidChange', this.handleAppSettingsChange);
  }

  async reloadData() {
    this.setState({ loading: true });
    let itemsSource = [];
    try {
      const dir = await fs.pathForAppGroup(APP_GROUP);
      const dataPath = `${dir}/yilanData.json`;

      if (await fs.exists(dataPath)) {
        const yilanDataJsonString = await fs.readFile(dataPath);
        itemsSource = JSON.parse(yilanDataJsonString);
      }

      this.setState({
        loading: false,
        itemsSource,
      });
    } catch (error) {
      this.setState({ loading: false });
      ProgressHUD.showError(error.message);
      ProgressHUD.dismiss(1500);
    }
  }

  handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.reloadData();
    }
  }

  handleAppSettingsChange(nextAppSettings) {
    console.log(nextAppSettings); // eslint-disable-line
    this.reloadData();
  }

  handlePressItem(item) {
    const result = resolveRouteAndParams(item);
    NavigationService.navigate(result.routeName, result.params);
  }

  renderListEmpty() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <ListEmptyIndicator
        title={t('screens.home.messageListEmptyTitle')}
        message={t('screens.home.messageListEmptyMessage')}
      />
    );
  }

  renderItem({ item }) {
    const {
      type,
      content,
      date,
    } = item;

    const title = content;
    const detailText = moment(date).fromNow();
    const fileName = type === 'file' ? content : `.${type}`;

    const renderImage = () => (
      <FileIcon
        fileName={fileName}
        isDirectory={false}
        style={{ width: 20, marginRight: 10 }}
      />
    );

    return (
      <ListItem
        renderImage={renderImage}
        renderTitle={() => (
          <ListItem.Title
            numberOfLines={2}
          >
            {title}
          </ListItem.Title>
        )}
        detailText={detailText}
        onPress={() => this.handlePressItem(item)}
        accessoryType={ListItem.accessoryTypes.DisclosureIndicator}
      />
    );
  }

  render() {
    const { itemsSource } = this.state;

    return (
      <Screen>
        <FlatList
          contentContainerStyle={{
            paddingBottom: ifIphoneX(34, 0),
          }}
          data={itemsSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <ListItem.Divider />}
          ListEmptyComponent={() => this.renderListEmpty()}
          keyExtractor={(item, index) => `${item.uuid || index}`}
        />
      </Screen>
    );
  }
}

export default Home;
