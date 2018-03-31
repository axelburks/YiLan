import React, { Component } from 'react';
import { AppState, DeviceEventEmitter, FlatList } from 'react-native';
import { ActivityIndicator, Divider, Screen } from '@blankapp/ui';
import RNFS from 'react-native-fs';
import moment from 'moment';
import { AppBar, FileIcon, ListEmptyIndicator, ListItem } from '../../components';
import IconNames from '../../components/Icon/IconNames';
import Lang from '../../utilities/Lang';
import resolveRouteAndParams from '../../utilities/resolveRouteAndParams';

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerRight = (
      <AppBar.IconButton
        name={IconNames.MenuSettings}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    );
    return {
      title: Lang.get('screens.home.title'),
      headerRight,
    };
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;

    this.loadData = this.loadData.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleAppSettingsChange = this.handleAppSettingsChange.bind(this);
    this.pressItem = this.pressItem.bind(this);
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
    this.loadData();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    DeviceEventEmitter.removeListener('appSettingsDidChange', this.handleAppSettingsChange);
  }

  loadData() {
    setTimeout(async () => {
      let itemsSource = [];
      try {
        const directory = await RNFS.pathForGroup('group.me.thecode.yilanapp');
        const yilanDataJsonPath = `${directory}/yilanData.json`;

        let yilanData = [];
        if (await RNFS.exists(yilanDataJsonPath)) {
          const yilanDataJsonString = await RNFS.readFile(yilanDataJsonPath);
          yilanData = JSON.parse(yilanDataJsonString);
        }
        itemsSource = yilanData;
      } catch (error) {
        alert(error.message);
      } finally {
        this.setState({
          loading: false,
          itemsSource,
        });
      }
    });
  }

  handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.loadData();
    }
  }

  handleAppSettingsChange(nextAppSettings) {
    console.log(nextAppSettings); // eslint-disable-line
    this.loadData();
  }

  pressItem(item) {
    const result = resolveRouteAndParams(item);
    this.navigation.navigate(result.routeName, result.params);
  }

  renderListEmpty() {
    return (
      <ListEmptyIndicator
        title={Lang.get('screens.home.messageListEmptyTitle')}
        description={Lang.get('screens.home.messageListEmptyMessage')}
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

    const fileIconView = (
      <FileIcon
        fileName={fileName}
        isDirectory={false}
        style={{ width: 20, marginRight: 10 }}
      />
    );

    return (
      <ListItem
        imageView={fileIconView}
        title={title}
        detailText={detailText}
        onPress={() => this.pressItem(item)}
        accessoryType="disclosureIndicator"
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Screen
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </Screen>
      );
    }

    return (
      <Screen>
        <FlatList
          data={this.state.itemsSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => this.renderListEmpty()}
          keyExtractor={(item, index) => `${item.uuid || index}`}
        />
      </Screen>
    );
  }
}

export default Home;
