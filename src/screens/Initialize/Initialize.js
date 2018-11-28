import React, { Component } from 'react';
import { ActivityIndicator, Screen } from '@blankapp/ui';
import SplashScreen from 'react-native-splash-screen';
import { StackActions, NavigationActions } from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import PreviewExtension from '../../modules/PreviewExtension';
import { APP_GROUP } from '../../utilities/constants';
import resolveRouteAndParams from '../../utilities/resolveRouteAndParams';

// eslint-disable-next-line
const fs = RNFetchBlob.fs;

class Initialize extends Component {
  // eslint-disable-next-line
  static navigationOptions = ({ navigation, screenProps }) => {
    if (!PreviewExtension) {
      return null;
    }
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    // eslint-disable-next-line
    this.navigation = this.props.navigation;

    this.reloadData = this.reloadData.bind(this);

    this.state = {};
  }

  componentDidMount() {
    setTimeout(async () => {
      await this.reloadData();
    });
  }

  async reloadData() {
    let routeName = 'Home';
    let params = { from: 'app' };

    const dir = await fs.pathForAppGroup(APP_GROUP);
    const yilanDataJsonPath = `${dir}/yilanData.json`;

    if (PreviewExtension) {
      routeName = 'PreviewOfUnsupported';
      params = { from: 'extension' };

      const yilanPreviewDataJsonPath = `${dir}/yilanPreviewData.json`;
      if (await fs.exists(yilanPreviewDataJsonPath)) {
        const jsonString = await fs.readFile(yilanPreviewDataJsonPath);
        const jsonData = JSON.parse(jsonString);
        jsonData.uuid = uuidv4();
        jsonData.date = moment().format();

        params = {
          ...params,
          ...jsonData,
        };

        const { routeName: resolvedRouteName } = resolveRouteAndParams(jsonData);
        routeName = resolvedRouteName;

        await fs.unlink(yilanPreviewDataJsonPath);


        let yilanData = [];
        if (await fs.exists(yilanDataJsonPath)) {
          const yilanDataJsonString = await fs.readFile(yilanDataJsonPath);
          yilanData = JSON.parse(yilanDataJsonString);
          yilanData = yilanData.filter(item => item.content !== jsonData.content);
          await fs.unlink(yilanDataJsonPath);
        }
        yilanData = [
          jsonData,
          ...yilanData,
        ];
        await fs.writeFile(yilanDataJsonPath, JSON.stringify(yilanData), 'utf8');
      }
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    });

    setTimeout(() => this.navigation.dispatch(resetAction));
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }

  render() {
    return (
      <Screen
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {
          PreviewExtension ? null : <ActivityIndicator />
        }
      </Screen>
    );
  }
}

export default Initialize;
