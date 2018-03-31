import fileIconsIconThemeJson from './file-icons-icon-theme.json';

const resolveFontIdAndIconName = (fileName, isDirectory) => {
  if (isDirectory) {
    return {
      fontId: 'octicons',
      iconName: '_folder',
    };
  }
  let iconName;
  const fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1);
  const { iconDefinitions, fileNames, fileExtensions } = fileIconsIconThemeJson;

  iconName = fileNames[fileName];
  if (!iconName) {
    iconName = fileExtensions[fileExtension];
  }

  if (Object.prototype.hasOwnProperty.call(iconDefinitions, iconName)) {
    const { fontId } = iconDefinitions[iconName];
    return { fontId, iconName };
  }

  return {
    fontId: 'octicons',
    iconName: '_file',
  };
};

export default resolveFontIdAndIconName;
