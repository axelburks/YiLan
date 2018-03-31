import React, { PureComponent } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import PropTypes from 'prop-types';
import RNTouchableOpacity from '@blankapp/ui/src/components/RNTouchableOpacity';

import withStyles from '@blankapp/ui/src/withStyles';
import Text from '@blankapp/ui/src/components/Text';

const propTypes = {
  ...RNTouchableOpacity.propTypes,
  text: PropTypes.string,
  textStyle: RNText.propTypes.style,
  disabled: PropTypes.bool,
};
const defaultProps = {
  text: '',
  textStyle: undefined,
  disabled: false,
};
const mapStyleToProps = [
  'activeOpacity',
];

class AppBarButton extends PureComponent {
  render() {
    let {
      text,
      textStyle,
      children,
    } = this.props;

    if (typeof children === 'string') {
      text = children;
      children = null;
    }

    if (!children) {
      if (textStyle && typeof textStyle === 'number') {
        textStyle = StyleSheet.flatten(textStyle);
      }
      children = (<Text style={textStyle} >{text}</Text>);
    }

    return (
      <RNTouchableOpacity
        {...this.props}
      >
        {children}
      </RNTouchableOpacity>
    );
  }
}

AppBarButton.propTypes = propTypes;
AppBarButton.defaultProps = defaultProps;

export default withStyles('AppBarButton', mapStyleToProps)(AppBarButton);
