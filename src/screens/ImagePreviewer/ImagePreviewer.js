import React, { Component } from 'react';
import { ActivityIndicator, Screen } from '@blankapp/ui';
import Lang from '../../utilities/Lang';

class ImagePreviewer extends Component {
  static navigationOptions = {
    title: Lang.get('screens.imagePreviewer.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;

    // this.state = {
    //   loading: true,
    // };
  }

  componentDidMount() {
    setTimeout(() => this.loadData());
  }

  loadData() {

  }

  render() {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }
}

export default ImagePreviewer;
