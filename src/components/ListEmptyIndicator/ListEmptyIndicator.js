import React, { PureComponent } from 'react';
import { Text as RNText, View as RNView } from 'react-native';
import PropTypes from 'prop-types';
import { withStyles, Image } from '@blankapp/ui';

const ListEmptyIndicatorTitle = withStyles('ListEmptyIndicatorTitle')(RNText);
const ListEmptyIndicatorMessage = withStyles('ListEmptyIndicatorMessage')(RNText);

const propTypes = {
  imageView: PropTypes.node,
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  imageStyle: PropTypes.oneOfType([PropTypes.object]),
  title: PropTypes.string,
  titleStyle: RNText.propTypes.style,
  message: PropTypes.string,
  messageStyle: RNText.propTypes.style,
  children: PropTypes.node,
};
const defaultProps = {
  imageView: null,
  imageSource: null,
  imageStyle: null,
  title: null,
  titleStyle: null,
  message: null,
  messageStyle: null,
  children: null,
};
class ListEmptyIndicator extends PureComponent {
  render() {
    /* eslint-disable prefer-const */
    let {
      children,
      imageView,
      imageSource,
      imageStyle,
      title,
      titleStyle,
      message,
      messageStyle,
      ...restProps
    } = this.props;

    if (!imageView && imageSource) {
      imageView = (
        <Image
          source={imageSource}
          style={imageStyle}
          resizeMode="contain"
        />
      );
    }
    let titleView;
    if (title) {
      titleView = (
        <ListEmptyIndicatorTitle style={titleStyle}>
          {title}
        </ListEmptyIndicatorTitle>
      );
    }
    let messageView;
    if (message) {
      messageView = (
        <ListEmptyIndicatorMessage style={messageStyle}>
          {message}
        </ListEmptyIndicatorMessage>
      );
    }

    return (
      <RNView
        {...restProps}
      >

        {imageView}
        {titleView}
        {messageView}
        {children}
      </RNView>
    );
  }
}

ListEmptyIndicator.propTypes = propTypes;
ListEmptyIndicator.defaultProps = defaultProps;

export default withStyles('ListEmptyIndicator')(ListEmptyIndicator);
