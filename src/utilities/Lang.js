import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import locales from '../resources/locales';

class Lang {
  constructor() {
    this.lang = DeviceInfo.getDeviceLocale();
  }

  get(key) {
    let message = _.get(locales, `${this.lang}.${key}`);
    if (message === undefined) {
      message = _.get(locales, `en.${key}`);
    }
    if (message === undefined) {
      message = `Missing ${this.lang}.${key}`;
    }
    return message;
  }
}

export default new Lang();
