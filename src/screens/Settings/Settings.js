import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  Linking,
  SectionList,
  Share,
} from 'react-native';
import {
  ListItem,
  ListSection,
  Screen,
  Text,
  View,
} from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import RNFetchBlob from 'rn-fetch-blob';
import DeviceInfo from 'react-native-device-info';
import Mailer from 'react-native-mail';
import { ProgressHUD, StoreReview } from '../../modules';
import { APP_GROUP } from '../../utilities/constants';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class Settings extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: t('screens.settings.title'),
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    this.handlePressItemClearCache = this.handlePressItemClearCache.bind(this);
    this.handlePressItemGetSupport = this.handlePressItemGetSupport.bind(this);
    this.handlePressItemSuggestions = this.handlePressItemSuggestions.bind(this);
    this.handlePressItemShare = this.handlePressItemShare.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      sectionsSource: [
        {
          title: t('screens.settings.listSectionItemGeneral'),
          data: [
            {
              title: t('screens.settings.listItemClearCache'),
              detailText: t('screens.settings.listItemClearCacheDetailText'),
              // accessoryType: 'none',
              onPress: this.handlePressItemClearCache,
            },
          ],
        },
        {
          title: t('screens.settings.listSectionItemHelpAndFeedback'),
          data: [
            {
              title: t('screens.settings.listItemGetSupport'),
              onPress: this.handlePressItemGetSupport,
            },
            {
              title: t('screens.settings.listItemSuggestions'),
              onPress: this.handlePressItemSuggestions,
            },
          ],
        },
        {
          title: t('screens.settings.listSectionItemOther'),
          data: [
            {
              title: t('screens.settings.listItemShare'),
              detailText: t('screens.settings.listItemShareDetailText'),
              onPress: this.handlePressItemShare,
            },
            {
              title: t('screens.settings.listItemStoreReview'),
              detailText: t('screens.settings.listItemStoreReviewDetailText'),
              onPress: this.handlePressItemStoreReview,
            },
          ],
        },
      ],
    };
  }

  handlePressItemClearCache() {
    ProgressHUD.show();
    setTimeout(async () => {
      try {
        const dir = await fs.pathForAppGroup(APP_GROUP);
        const filePaths = [
          `${dir}/files`,
          `${dir}/yilanData.json`,
          `${dir}/yilanPreviewData.json`,
        ];

        for (let i = 0; i < filePaths.length; i += 1) {
          const path = filePaths[i];
          // eslint-disable-next-line
          await fs.unlink(path);
        }
        ProgressHUD.showSuccess(t('screens.settings.messageClearCacheCompletion'));
        ProgressHUD.dismiss(1500);
      } catch (error) {
        ProgressHUD.showError(error.message);
        ProgressHUD.dismiss(1500);
      } finally {
        DeviceEventEmitter.emit('appSettingsDidChange', { });
      }
    });
  }

  handlePressItemGetSupport() {
    const options = {
      subject: t('screens.settings.getSupportMailSubject'),
      recipients: ['lijy91@foxmail.com'],
      body: t('screens.settings.getSupportMailBody'),
      isHTML: true,
    };
    const callback = (error) => {
      if (error) {
        alert(t('screens.settings.messageManualGetSupport'));
      }
    };

    Mailer.mail(options, callback);
  }

  handlePressItemSuggestions() {
    Linking.openURL('https://jinshuju.net/f/0lUGZW')
      .catch((error) => {
        alert(error.message);
      });
  }

  handlePressItemShare() {
    Share.share({
      message: t('screens.settings.shareMessage'),
      url: 'https://yilan.thecode.me',
    });
  }

  handlePressItemStoreReview() {
    StoreReview.requestReview();
  }

  renderSectionHeader({ section }) {
    if (!section.title) {
      return null;
    }
    return (
      <ListSection {...section} />
    );
  }

  renderItem({ item }) {
    const { onPress } = item;
    return (
      <ListItem
        title={item.title}
        detailText={item.detailText}
        accessoryType={item.accessoryType || 'disclosureIndicator'}
        onPress={() => onPress(item)}
      />
    );
  }

  renderListFooter() {
    const buildNumber = DeviceInfo.getBuildNumber();
    const version = DeviceInfo.getVersion();
    return (
      <View
        style={{
          alignItems: 'center',
          margin: 20,
        }}
      >
        <Text>{t('screens.settings.labelRevisionNumber')}</Text>
        <Text>{`v${version} (${buildNumber})`}</Text>
      </View>
    );
  }

  render() {
    const { sectionsSource } = this.state;
    return (
      <Screen>
        <SectionList
          sections={sectionsSource}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <ListItem.Divider />}
          ListFooterComponent={this.renderListFooter}
          keyExtractor={(item, index) => `${index}`}
        />
      </Screen>
    );
  }
}

export default Settings;
