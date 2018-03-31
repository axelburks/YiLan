import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Button, Divider, Screen } from '@blankapp/ui';
import { ListEmptyIndicator } from '../../components';
import Lang from '../../utilities/Lang';

class Unsupported extends Component {
  static navigationOptions = {
    title: Lang.get('screens.unsupported.title'),
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.navigationParams = this.navigation.state.params;
    this.pressPreviewInCodePreviewer = this.pressPreviewInCodePreviewer.bind(this);

    const { type } = this.navigationParams;
    this.state = { type };
  }

  pressPreviewInCodePreviewer() {
    this.navigation.navigate('CodePreviewer', this.navigationParams);
  }

  renderListEmpty() {
    return [
      <ListEmptyIndicator
        title={Lang.get('screens.unsupported.messageUnsupportedTitle')}
        description={Lang.get('screens.unsupported.messageUnsupportedMessage')}
      />,
      this.state.type !== 'file' ? null :
      <Button
        style={{
          marginLeft: 60,
          marginRight: 60,
        }}
        text={Lang.get('screens.unsupported.buttonPreviewInCodePreviewer')}
        onPress={this.pressPreviewInCodePreviewer}
      />,
    ];
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

export default Unsupported;
