// See https://github.com/facebook/jest/issues/2208
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn().mockImplementation(value => Promise.resolve(value)),
}));

// See https://github.com/facebook/react-native/issues/11659
jest.mock('ScrollView', () => {
  const RealComponent = require.requireActual('ScrollView');
  class ScrollView extends RealComponent {
    scrollTo = () => {}
  }
  return ScrollView;
});

jest.mock('react-native-fs', () => 'RNFS');
jest.mock('react-native-device-info', () => ({
  getModel: jest.fn(),
  getDeviceName: jest.fn(),
  getDeviceLocale: jest.fn(),
}));
