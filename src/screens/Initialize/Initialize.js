import React, { Component } from 'react';
import { ActivityIndicator, Screen } from '@blankapp/ui';
import { NavigationActions } from 'react-navigation';
import RNFS from 'react-native-fs';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import PreviewExtension from '../../modules/PreviewExtension';
import resolveRouteAndParams from '../../utilities/resolveRouteAndParams';

class Initialize extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  componentDidMount() {
    setTimeout(async () => {
      let routeName = 'Home';
      let params = { from: 'app' };

      const directory = await RNFS.pathForGroup('group.me.thecode.yilanapp');
      const yilanDataJsonPath = `${directory}/yilanData.json`;

      if (PreviewExtension) {
        routeName = 'Unsupported';
        params = { from: 'extension' };

        const yilanPreviewDataJsonPath = `${directory}/yilanPreviewData.json`;
        if (await RNFS.exists(yilanPreviewDataJsonPath)) {
          const jsonString = await RNFS.readFile(yilanPreviewDataJsonPath);
          const jsonData = JSON.parse(jsonString);
          jsonData.uuid = uuidv4();
          jsonData.date = moment().format();

          params = {
            ...params,
            ...jsonData,
          };

          const { routeName: resolvedRouteName } = resolveRouteAndParams(jsonData);
          routeName = resolvedRouteName;

          await RNFS.unlink(yilanPreviewDataJsonPath);


          let yilanData = [];
          if (await RNFS.exists(yilanDataJsonPath)) {
            const yilanDataJsonString = await RNFS.readFile(yilanDataJsonPath);
            yilanData = JSON.parse(yilanDataJsonString);
            yilanData = yilanData.filter(item => item.content !== jsonData.content);
            await RNFS.unlink(yilanDataJsonPath);
          }
          yilanData = [
            jsonData,
            ...yilanData,
          ];
          await RNFS.writeFile(yilanDataJsonPath, JSON.stringify(yilanData), 'utf8');
        }
      }

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })],
      });

      setTimeout(() => this.navigation.dispatch(resetAction));
    });
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
        <ActivityIndicator />
      </Screen>
    );
  }
}

export default Initialize;
