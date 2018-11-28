import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import {
  Button,
  HyperlinkButton,
  ListItem,
  Screen,
  Text,
  TextInput,
  View,
} from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import RNFetchBlob from 'rn-fetch-blob';
import _ from 'lodash';
import numeral from 'numeral';
import {
  ProgressHUD,
  Unarchiver,
} from '../../modules';
import { FileIcon, ListEmptyIndicator } from '../../components';
import SupportedFileTypes from './SupportedFileTypes';
import resolveRouteAndParams from '../../utilities/resolveRouteAndParams';
import { ifIphoneX } from '../../utilities/iphone-x-helper';
import NavigationService from '../../navigators/NavigationService';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class PreviewOfArchive extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    return {
      title: params.title || t('screens.previewOfArchive.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    this.reloadData = this.reloadData.bind(this);
    this.handlePressUnarchive = this.handlePressUnarchive.bind(this);
    this.handlePressItem = this.handlePressItem.bind(this);
    this.renderBreadcrumb = this.renderBreadcrumb.bind(this);
    this.renderListEmpty = this.renderListEmpty.bind(this);
    this.renderItem = this.renderItem.bind(this);

    const fileName = this.navigation.getParam('extraFileName');
    const filePath = this.navigation.getParam('extraFilePath');

    this.state = {
      loading: true,
      fileName,
      filePath,
      currentPath: '',
      archivePassword: '',
      archiveEncrypted: true,
      archiveUnarchiveing: false,
      itemsSource: [],
    };
  }

  componentDidMount() {
    const { fileName: title } = this.state;
    this.navigation.setParams({ title });

    setTimeout(async () => { await this.reloadData(); }, 100);
  }

  async reloadData() {
    const {
      currentPath,
      archivePassword,
    } = this.state;

    const {
      // fileName,
      filePath,
    } = this.state;

    try {
      let dirPath = filePath;

      const sourcePath = filePath;
      const targetPath = `${filePath.substring(0, filePath.lastIndexOf('.'))}`;

      if (!await fs.exists(targetPath)) {
        await Unarchiver.unarchive(sourcePath, targetPath, archivePassword);
      }
      dirPath = `${targetPath}${currentPath}`;

      const ignoreNames = [
        '.DS_Store',
        '__MACOSX',
        'Thumbs.db',
        'ehthumbs.db',
        'ehthumbs_vista.db',
      ];

      const files = await fs.lstat(dirPath);
      const itemsSource = _
        .sortBy(files, [item => item.type !== 'directory', 'filename'])
        .filter(item => !ignoreNames.includes(item.filename));

      this.setState({
        loading: false,
        itemsSource,
        archiveEncrypted: false,
        archiveUnarchiveing: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        archivePassword: '',
        archiveUnarchiveing: false,
      });
      if (error.code === '99') {
        return;
      }
      ProgressHUD.showError(error.message);
      ProgressHUD.dismiss(1500);
    }
  }

  handlePressUnarchive() {
    this.setState({ archiveUnarchiveing: true });
    setTimeout(async () => { await this.reloadData(); }, 100);
  }

  handlePressItem(item) {
    const isDirectory = item.type === 'directory';

    const {
      filename: fileName,
      path: filePath,
    } = item;

    if (isDirectory) {
      const { currentPath } = this.state;
      this.setState(
        {
          loading: true,
          currentPath: `${currentPath}/${fileName}`,
          itemsSource: [],
        },
        async () => {
          await this.reloadData();
          setTimeout(() => { this.scrollView.scrollToEnd(); }, 300);
        },
      );
      return;
    }

    const jsonData = {
      type: 'file',
      extraFileName: fileName,
      extraFilePath: filePath,
    };
    const { routeName, params } = resolveRouteAndParams(jsonData);
    NavigationService.push(routeName, params);
  }

  renderBreadcrumb() {
    const {
      loading,
      fileName,
      currentPath,
      archiveEncrypted,
    } = this.state;
    if (archiveEncrypted) return null;

    if (loading && currentPath.length === 0) return null;

    const dirs = currentPath.split('/');

    const breadcrumbView = dirs.map((v, index) => {
      const isLastDir = index === dirs.length - 1;
      const key = `v${index}`;
      return (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <HyperlinkButton
            text={v || fileName}
            disabled={isLastDir}
            textStyle={{
              paddingLeft: 4,
              paddingRight: 4,
              textDecorationLine: 'none',
            }}
            onPress={() => {
              const newCurrentPath = dirs.slice(0, index + 1).join('/');
              this.setState(
                {
                  currentPath: newCurrentPath,
                },
                async () => {
                  await this.reloadData();
                  setTimeout(() => { this.scrollView.scrollToEnd(); }, 300);
                },
              );
            }}
          />
          <Text>
            /
          </Text>
        </View>
      );
    });

    return (
      <View>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          horizontal
          style={{
            height: 44,
          }}
          contentContainerStyle={{
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          {breadcrumbView}
        </ScrollView>
      </View>
    );
  }

  renderListEmpty() {
    const {
      loading,
      archivePassword,
      archiveEncrypted,
      archiveUnarchiveing,
    } = this.state;
    if (loading) return null;

    if (archiveEncrypted) {
      return (
        <ListEmptyIndicator
          title={t('screens.previewOfArchive.messageArchiveEncryptedTitle')}
        >
          <View
            style={{
              width: '100%',
            }}
          >
            <TextInput
              style={{
                marginLeft: 40,
                marginRight: 40,
                marginTop: 24,
                marginBottom: 16,
                backgroundColor: '#ffffff',
              }}
              placeholder={t('screens.previewOfArchive.placeholderArchivePassword')}
              value={archivePassword}
              secureTextEntry
              onChangeText={value => this.setState({ archivePassword: value })}
            />
            <Button
              style={{
                marginLeft: 40,
                marginRight: 40,
              }}
              loading={archiveUnarchiveing}
              disabled={archivePassword.length === 0}
              text={t('screens.previewOfArchive.buttonUnarchive')}
              onPress={this.handlePressUnarchive}
            />
          </View>
        </ListEmptyIndicator>
      );
    }
    return (
      <ListEmptyIndicator
        title={t('screens.previewOfArchive.messageListEmptyMessage')}
        message=" "
      />
    );
  }

  renderItem({ item }) {
    const isDirectory = item.type === 'directory';
    const {
      filename: fileName,
      path: filePath,
      size: fileSize,
    } = item;

    const { routeName } = resolveRouteAndParams({
      type: 'file',
      extraFileName: fileName,
      extraFilePath: filePath,
    });
    const textStyle = {
      color: !isDirectory && routeName === 'PreviewOfUnsupported' ? 'rgba(0, 0, 0, 0.4)' : '#000000',
    };
    const fileIconView = (
      <FileIcon
        fileName={fileName}
        isDirectory={isDirectory}
        style={{ width: 20, marginRight: 10, ...textStyle }}
      />
    );

    const accessoryView = isDirectory ? null : (
      <Text
        style={textStyle}
      >
        {numeral(fileSize).format('0.00b')}
      </Text>
    );

    return (
      <ListItem
        renderImage={() => fileIconView}
        renderAccessoryView={() => accessoryView}
        title={fileName}
        titleStyle={textStyle}
        accessoryType={ListItem.accessoryTypes.DisclosureIndicator}
        onPress={() => this.handlePressItem(item)}
      />
    );
  }

  render() {
    const {
      itemsSource,
    } = this.state;

    return (
      <Screen>
        {this.renderBreadcrumb()}
        <FlatList
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: ifIphoneX(34, 0),
          }}
          data={itemsSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <ListItem.Divider />}
          ListEmptyComponent={this.renderListEmpty}
          keyExtractor={item => `${item.filename}`}
        />
      </Screen>
    );
  }
}

PreviewOfArchive.SupportedFileTypes = SupportedFileTypes;

export default PreviewOfArchive;
