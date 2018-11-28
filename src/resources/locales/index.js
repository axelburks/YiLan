import en from './en';
import zhHans from './zh-Hans';

const locales = {
  en,
  'en-US': en,
  'en-CN': en,
  'zh-CN': zhHans,
  'zh-Hans': zhHans, // 简体中文
  'zh-Hans-CN': zhHans, // 大陆地区使用的简体中文
  'zh-Hans-HK': zhHans, // 香港地区使用的简体中文
  'zh-Hans-MO': zhHans, // 澳门使用的简体中文
  'zh-Hans-SG': zhHans, // 新加坡使用的简体中文
  'zh-Hans-TW': zhHans, // 台湾使用的简体中文
};

export default locales;
