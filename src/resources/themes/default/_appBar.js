import { transparent, textPrimary } from './colors';
import { fontSizeButton } from './dimens';

export default {
  AppBarBackButton: {
    activeOpacity: 0.8,
    backgroundColor: transparent,
    width: 42,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    Icon: {
      color: textPrimary,
      size: 42 / 2,
    },
  },
  AppBarButton: {
    activeOpacity: 0.8,
    backgroundColor: transparent,
    paddingTop: 0,
    paddingRight: 8,
    paddingBottom: 0,
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    Text: {
      alignItems: 'stretch',
      fontSize: fontSizeButton,
      fontWeight: 'bold',
      color: textPrimary,
      minWidth: 48,
    },
  },
  AppBarIconButton: {
    activeOpacity: 0.8,
    backgroundColor: transparent,
    width: 42,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    Icon: {
      color: textPrimary,
      size: 42 / 2,
    },
  },
};
