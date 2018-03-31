import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RNTouchableOpacity from '@blankapp/ui/src/components/RNTouchableOpacity';

import withStyles from '@blankapp/ui/src/withStyles';
import Icon from '../Icon';
import IconNames from '../Icon/IconNames';

const propTypes = {
  ...RNTouchableOpacity.propTypes,
  disabled: PropTypes.bool,
};
const defaultProps = {
  disabled: false,
};
const mapStyleToProps = [
  'activeOpacity',
];

class AppBarBackButton extends PureComponent {
  render() {
    let {
      children,
    } = this.props;

    if (!children) {
      children = (<Icon name={IconNames.MenuBack} />);
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

AppBarBackButton.propTypes = propTypes;
AppBarBackButton.defaultProps = defaultProps;

export default withStyles('AppBarBackButton', mapStyleToProps)(AppBarBackButton);
