import {
  transparent,
  textPrimary,
  textSecondary,
} from './colors';

export default {
  ListEmptyIndicator: {
    flex: 1,
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    Image: {
      marginBottom: 40,
    },
  },
  ListEmptyIndicatorTitle: {
    color: textPrimary,
    backgroundColor: transparent,
    fontSize: 18,
    // marginTop: 20,
    // marginBottom: 20,
    textAlign: 'center',
  },
  ListEmptyIndicatorMessage: {
    color: textSecondary,
    backgroundColor: transparent,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
};
