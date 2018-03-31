import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator, Divider, Screen, Text } from '@blankapp/ui';
import RNFS from 'react-native-fs';
import _ from 'lodash';
import numeral from 'numeral';
import Unarchiver from '../../modules/Unarchiver';
import { FileIcon, ListEmptyIndicator, ListItem } from '../../components';
import Lang from '../../utilities/Lang';
import SupportedFileTypes from './SupportedFileTypes';
import resolveRouteAndParams from '../../utilities/resolveRouteAndParams';

class ArchivePreviewer extends Component {
  static navigationOptions = {
    title: Lang.get('screens.archivePreviewer.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    this.pressItem = this.pressItem.bind(this);
    this.renderListEmpty = this.renderListEmpty.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      loading: true,
      itemsSource: [],
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      let itemsSource = [];
      const {
        type,
        // extraFileName: fileName,
        extraFilePath: filePath,
      } = this.navigationParams;

      try {
        let dirPath = filePath;
        if (type === 'file') {
          const sourcePath = filePath;
          const targetPath = `${filePath}__YILAN__`;
          if (!await RNFS.exists(targetPath)) {
            await Unarchiver.unarchive(sourcePath, targetPath);
          }
          dirPath = targetPath;
        }

        const ignoreNames = [
          '.DS_Store',
          '__MACOSX',
          'Thumbs.db',
          'ehthumbs.db',
          'ehthumbs_vista.db',
        ];

        const dirItems = await RNFS.readDir(dirPath);
        itemsSource = _
          .sortBy(dirItems, [item => !item.isDirectory(), 'name'])
          .filter(item => !ignoreNames.includes(item.name));
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

  pressItem(item) {
    let routeName;
    let params;
    if (item.isDirectory()) {
      const jsonData = {
        type: 'dir',
        extraFileName: item.name,
        extraFilePath: item.path,
      };
      routeName = 'ArchivePreviewer';
      params = jsonData;
    } else {
      const jsonData = {
        type: 'file',
        extraFileName: item.name,
        extraFilePath: item.path,
      };
      const result = resolveRouteAndParams(jsonData);
      /* eslint-disable prefer-destructuring */
      routeName = result.routeName;
      params = result.params;
      /* eslint-enable prefer-destructuring */
    }
    this.navigation.navigate(routeName, params);
  }

  renderListEmpty() {
    return (
      <ListEmptyIndicator
        title={Lang.get('screens.archivePreviewer.messageListEmptyTitle')}
        description={Lang.get('screens.archivePreviewer.messageListEmptyMessage')}
      />
    );
  }

  renderItem({ item }) {
    const { name: fileName, size: fileSize } = item;

    const { routeName } = resolveRouteAndParams({
      type: 'file',
      extraFileName: item.name,
      extraFilePath: item.path,
    });
    const textStyle = {
      color: !item.isDirectory() && routeName === 'Unsupported' ? 'rgba(0, 0, 0, 0.4)' : '#000000',
    };
    const fileIconView = (
      <FileIcon
        fileName={fileName}
        isDirectory={item.isDirectory()}
        style={{ width: 20, marginRight: 10, ...textStyle }}
      />
    );

    const accessoryView = item.isDirectory() ? undefined :
      (<Text style={textStyle}>{numeral(fileSize).format('0.00b')}</Text>);

    return (
      <ListItem
        imageView={fileIconView}
        title={fileName}
        titleStyle={textStyle}
        // detailText={detailText}
        accessoryType="disclosureIndicator"
        accessoryView={accessoryView}
        onPress={() => this.pressItem(item)}
      />
    );
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
        <FlatList
          data={this.state.itemsSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => this.renderListEmpty()}
          keyExtractor={(item, index) => `${index}`}
        />
      </Screen>
    );
  }
}

ArchivePreviewer.SupportedFileTypes = SupportedFileTypes;

export default ArchivePreviewer;
