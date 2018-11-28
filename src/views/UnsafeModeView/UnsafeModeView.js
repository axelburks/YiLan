import React, { Component } from 'react';
import { Button, View } from '@blankapp/ui';
import { t } from '@blankapp/plugin-i18n';
import { ListEmptyIndicator } from '../../components';

class UnsafeModeView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // eslint-disable-next-line
    const { onContinue } = this.props;
    return (
      <ListEmptyIndicator
        title={t('views.unsafeModeView.messageTitle')}
        message={t('views.unsafeModeView.messageMessage')}
      >
        <View
          style={{
            width: '100%',
          }}
        >
          <Button
            style={{
              marginLeft: 60,
              marginRight: 60,
            }}
            text={t('views.unsafeModeView.buttonContinue')}
            onPress={() => {
              if (onContinue) {
                onContinue();
              }
            }}
          />
        </View>
      </ListEmptyIndicator>
    );
  }
}

export default UnsafeModeView;
