import React, { Component } from 'react';
import { DeviceEventEmitter, Linking, SectionList, Share } from 'react-native';
import { Divider, Screen, Text, View } from '@blankapp/ui';
import DeviceInfo from 'react-native-device-info';
import Mailer from 'react-native-mail';
import RNFS from 'react-native-fs';
import { ListItem } from '../../components';
import Lang from '../../utilities/Lang';
import StoreReview from '../../modules/StoreReview';

class Settings extends Component {
  static navigationOptions = {
    title: Lang.get('screens.settings.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;

    this.pressItemUserGuide = this.pressItemUserGuide.bind(this);
    this.pressItemClearCache = this.pressItemClearCache.bind(this);
    this.pressItemGetSupport = this.pressItemGetSupport.bind(this);
    this.pressItemSuggestions = this.pressItemSuggestions.bind(this);
    this.pressItemShare = this.pressItemShare.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      sectionsSource: [
        {
          title: null,
          data: [
            {
              title: Lang.get('screens.settings.listItemUserGuide'),
              onPress: this.pressItemUserGuide,
            },
          ],
        },
        {
          title: Lang.get('screens.settings.listSectionItemGeneral'),
          data: [
            {
              title: Lang.get('screens.settings.listItemClearCache'),
              detailText: Lang.get('screens.settings.listItemClearCacheDetailText'),
              // accessoryType: 'none',
              onPress: this.pressItemClearCache,
            },
          ],
        },
        {
          title: Lang.get('screens.settings.listSectionItemHelpAndFeedback'),
          data: [
            {
              title: Lang.get('screens.settings.listItemGetSupport'),
              onPress: this.pressItemGetSupport,
            },
            {
              title: Lang.get('screens.settings.listItemSuggestions'),
              onPress: this.pressItemSuggestions,
            },
          ],
        },
        {
          title: Lang.get('screens.settings.listSectionItemMore'),
          data: [
            {
              title: Lang.get('screens.settings.listItemShare'),
              detailText: Lang.get('screens.settings.listItemShareDetailText'),
              onPress: this.pressItemShare,
            },
            {
              title: Lang.get('screens.settings.listItemStoreReview'),
              detailText: Lang.get('screens.settings.listItemStoreReviewDetailText'),
              onPress: this.pressItemStoreReview,
            },
          ],
        },
      ],
    };
  }

  pressItemUserGuide() {
    this.navigation.navigate('UserGuide');
  }

  pressItemClearCache() {
    setTimeout(async () => {
      try {
        const directory = await RNFS.pathForGroup('group.me.thecode.yilanapp');
        const dataFiles = [
          `${directory}/yilanData.json`,
          `${directory}/yilanPreviewData.json`,
          `${directory}/yilanTranslateData.json`,
          `${directory}/yilanWikipediaData.json`,
        ];

        dataFiles.forEach(async (filePath) => {
          if (await RNFS.exists(filePath)) {
            RNFS.unlink(filePath);
          }
        });
        alert(Lang.get('screens.settings.messageClearCacheCompletion'));
      } catch (error) {
        alert(error.message);
      } finally {
        DeviceEventEmitter.emit('appSettingsDidChange', { });
      }
    });
  }

  pressItemGetSupport() {
    const options = {
      subject: Lang.get('screens.settings.getSupportMailSubject'),
      recipients: ['lijy91@foxmail.com'],
      body: Lang.get('screens.settings.getSupportMailBody'),
      isHTML: true,
    };
    const callback = (error) => {
      if (error) {
        alert(Lang.get('screens.settings.messageManualGetSupport'));
      }
    };

    Mailer.mail(options, callback);
  }

  pressItemSuggestions() {
    Linking.openURL('https://jinshuju.net/f/0lUGZW')
      .catch((error) => {
        alert(error.message);
      });
  }

  pressItemShare() {
    Share.share({
      message: Lang.get('screens.settings.shareMessage'),
      url: 'https://yilan.thecode.me',
    });
  }

  pressItemStoreReview() {
    StoreReview.requestReview();
  }

  renderSectionHeader({ section }) {
    if (!section.title) {
      return null;
    }
    return (
      <Text
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 12,
          paddingBottom: 6,
        }}
      >
        {section.title}
      </Text>
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
        <Text>{Lang.get('screens.settings.labelRevisionNumber')}</Text>
        <Text>{`${version} (${buildNumber})`}</Text>
      </View>
    );
  }

  render() {
    return (
      <Screen>
        <SectionList
          sections={this.state.sectionsSource}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => <Divider style={{ marginLeft: 12 }} />}
          ListFooterComponent={this.renderListFooter}
          keyExtractor={(item, index) => `${index}`}
        />
      </Screen>
    );
  }
}

export default Settings;
