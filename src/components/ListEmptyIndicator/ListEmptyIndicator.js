import React, { PureComponent } from 'react';
import { View as RNView } from 'react-native';
import PropTypes from 'prop-types';
import { Title, Text } from '@blankapp/ui';
import withStyles from '@blankapp/ui/src/withStyles';

const propTypes = {
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  description: PropTypes.string,
  descriptionStyle: Text.propTypes.style,
  buttonText: PropTypes.string,
};

const defaultProps = {
  title: undefined,
  titleStyle: undefined,
  description: undefined,
  descriptionStyle: undefined,
  buttonText: undefined,
};

class ListEmptyIndicator extends PureComponent {
  render() {
    const {
      title,
      titleStyle,
      description,
      descriptionStyle,
    } = this.props;

    let titleView;
    let descriptionView;

    if (title) {
      titleView = (
        <Title style={titleStyle}>{title}</Title>
      );
    }

    if (description) {
      descriptionView = (
        <Text style={descriptionStyle}>{description}</Text>
      );
    }

    return (
      <RNView
        {...this.props}
      >
        {titleView}
        {descriptionView}
      </RNView>
    );
  }
}

ListEmptyIndicator.propTypes = propTypes;
ListEmptyIndicator.defaultProps = defaultProps;

export default withStyles('ListEmptyIndicator')(ListEmptyIndicator);
