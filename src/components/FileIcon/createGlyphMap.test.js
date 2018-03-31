import createGlyphMap from './createGlyphMap';

it('createGlyphMap', () => {
  const glyphMap = createGlyphMap('octicons');
  // console.log(JSON.stringify(glyphMap, null, 2));
  expect(glyphMap).toMatchObject({});
});
