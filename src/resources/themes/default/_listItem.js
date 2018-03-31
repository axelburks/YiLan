import {
  transparent,
  white,
  textPrimary,
  textSecondary,
} from './colors';
import {
  fontSizeTitle,
  fontSizeSubheading,
} from './dimens';

export default {
  ListItem: {
    backgroundColor: white,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
  },
  ListItemImage: {
    width: 40,
    height: 40,
  },
  ListItemContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ListItemTitle: {
    backgroundColor: transparent,
    color: textPrimary,
    fontSize: fontSizeTitle,
  },
  ListItemDetailText: {
    color: textSecondary,
    backgroundColor: transparent,
    fontSize: fontSizeSubheading,
    marginTop: 4,
  },
};
