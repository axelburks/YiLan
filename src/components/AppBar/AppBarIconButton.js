import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RNTouchableOpacity from '@blankapp/ui/src/components/RNTouchableOpacity';

import withStyles from '@blankapp/ui/src/withStyles';
import Icon from '../Icon';

const propTypes = {
  ...RNTouchableOpacity.propTypes,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
const defaultProps = {
  disabled: false,
};
const mapStyleToProps = [
  'activeOpacity',
];

class AppBarIconButton extends PureComponent {
  render() {
    let {
      children,
    } = this.props;

    if (!children) {
      children = (<Icon name={this.props.name} />);
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

AppBarIconButton.propTypes = propTypes;
AppBarIconButton.defaultProps = defaultProps;

export default withStyles('AppBarIconButton', mapStyleToProps)(AppBarIconButton);
