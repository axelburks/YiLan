import React, { PureComponent } from 'react';
import { View as RNView } from 'react-native';
import PropTypes from 'prop-types';
import RNTouchableOpacity from '@blankapp/ui/src/components/RNTouchableOpacity';
import withStyles from '@blankapp/ui/src/withStyles';
import ListItemImage from './ListItemImage';
import ListItemContentView from './ListItemContentView';
import ListItemTitle from './ListItemTitle';
import ListItemDetailText from './ListItemDetailText';
import Icon from '../Icon';

const propTypes = {
  ...RNTouchableOpacity.propTypes,
  imageView: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  titleView: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  detailTextView: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  accessoryView: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  imageSource: PropTypes.string,
  imageStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  detailText: PropTypes.string,
  detailTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  accessoryType: PropTypes.oneOf([
    'none',
    'disclosureIndicator',
  ]),
};
const defaultProps = {
  imageView: undefined,
  titleView: undefined,
  detailTextView: undefined,
  accessoryView: undefined,
  imageSource: undefined,
  imageStyle: undefined,
  title: undefined,
  titleStyle: undefined,
  detailText: undefined,
  detailTextStyle: undefined,
  accessoryType: 'none',
};

/**
 * @example
 * <ListItem
 *   title="React Native"
 *   detailText="Build native mobile apps using JavaScript and React"
 *   accessoryType="disclosureIndicator"
 *   dividers={['top', 'bottom']}
 * />
 */
class ListItem extends PureComponent {
  static AccessoryType = {
    None: 'none',
    DisclosureIndicator: 'disclosureIndicator',
  }

  render() {
    const {
      onPress,
      imageSource,
      imageStyle,
      title,
      titleStyle,
      detailText,
      detailTextStyle,
      accessoryType,
    } = this.props;

    let {
      imageView,
      titleView,
      detailTextView,
      accessoryView,
    } = this.props;

    imageView = typeof imageView === 'function' ? imageView() : imageView;
    titleView = typeof titleView === 'function' ? titleView() : titleView;
    detailTextView = typeof detailTextView === 'function' ? detailTextView() : detailTextView;
    accessoryView = typeof accessoryView === 'function' ? accessoryView() : accessoryView;

    if (!imageView && imageSource) {
      imageView = (
        <ListItemImage
          style={imageStyle}
          source={imageSource}
        />
      );
    }

    if (!titleView && title) {
      titleView = (
        <ListItemTitle
          style={titleStyle}
        >{title}
        </ListItemTitle>
      );
    }
    if (!detailTextView && detailText) {
      detailTextView = (
        <ListItemDetailText
          style={detailTextStyle}
        >{detailText}
        </ListItemDetailText>
      );
    }

    let allowPress = false;

    switch (accessoryType) {
      case 'disclosureIndicator':
        allowPress = true;
        if (!accessoryView) {
          accessoryView = <Icon name="keyboard-arrow-right" />;
        }
        break;
      default:
        // Do nothing.
        break;
    }
    const props = {
      ...this.props,
      activeOpacity: allowPress ? this.props.activeOpacity : 1,
    };
    return (
      <RNView>
        <RNTouchableOpacity
          {...props}
          onPress={() => {
            if (allowPress && onPress) {
              onPress();
            }
          }}
        >
          {imageView}
          <ListItemContentView>
            {titleView}
            {detailTextView}
          </ListItemContentView>
          {accessoryView}
        </RNTouchableOpacity>
      </RNView>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default withStyles('ListItem')(ListItem);
