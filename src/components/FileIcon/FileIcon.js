import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createIconSet } from 'react-native-vector-icons';
import withStyles from '@blankapp/ui/src/withStyles';
import createGlyphMap from './createGlyphMap';
import resolveFontIdAndIconName from './resolveFontIdAndIconName';

const FileIconsIcon = createIconSet(createGlyphMap('file-icons'), 'file-icons');
const FontAwesomeIcon = createIconSet(createGlyphMap('fontawesome'), 'fontawesome');
const OcticonsIcon = createIconSet(createGlyphMap('octicons'), 'octicons');
const MfixxIcon = createIconSet(createGlyphMap('mfixx'), 'mfixx');
const DevopiconsIcon = createIconSet(createGlyphMap('devopicons'), 'devopicons');

const propTypes = {
  fileName: PropTypes.string,
  isDirectory: PropTypes.bool,
};

const defaultProps = {
  fileName: undefined,
  isDirectory: false,
};
const mapStyleToProps = [
  'color',
  'size',
];

class FileIcon extends PureComponent {
  render() {
    let iconView;
    const { fileName, isDirectory } = this.props;
    const { fontId, iconName } = resolveFontIdAndIconName(fileName, isDirectory);
    const props = {
      ...this.props,
      name: iconName,
    };

    switch (fontId) {
      case 'file-icons':
        iconView = <FileIconsIcon {...props} />;
        break;
      case 'fontawesome':
        iconView = <FontAwesomeIcon {...props} />;
        break;
      case 'octicons':
        iconView = <OcticonsIcon {...props} />;
        break;
      case 'mfixx':
        iconView = <MfixxIcon {...props} />;
        break;
      case 'devopicons':
        iconView = <DevopiconsIcon {...props} />;
        break;
      default:
        iconView = null;
        break;
    }
    return iconView;
  }
}

FileIcon.propTypes = propTypes;
FileIcon.defaultProps = defaultProps;

export default withStyles('FileIcon', mapStyleToProps)(FileIcon);
