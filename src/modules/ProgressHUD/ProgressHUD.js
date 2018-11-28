import { NativeModules } from 'react-native';

const { RNProgressHUD } = NativeModules;

const ProgressHUD = {
  ...RNProgressHUD,
  show: (status = '') => {
    RNProgressHUD.show(status);
  },
  dismiss: (delay = 0) => {
    RNProgressHUD.dismiss(delay);
  },
};

export default ProgressHUD;
