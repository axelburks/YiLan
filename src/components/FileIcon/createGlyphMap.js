import fileIconsIconThemeJson from './file-icons-icon-theme.json';

const createGlyphMap = (id) => {
  const glyphMap = {};
  const { iconDefinitions } = fileIconsIconThemeJson;

  Object.keys(iconDefinitions).forEach((key) => {
    const { fontCharacter, fontId } = iconDefinitions[key];
    if (fontId === id && fontCharacter) {
      glyphMap[key] = parseInt(fontCharacter.replace('\\', '0x'), 16);
    }
  });
  return glyphMap;
};

export default createGlyphMap;
