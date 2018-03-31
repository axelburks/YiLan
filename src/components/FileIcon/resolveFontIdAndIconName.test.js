import resolveFontIdAndIconName from './resolveFontIdAndIconName';

it('resolveFontIdAndIconName', () => {
  const result = resolveFontIdAndIconName('.gitignore');
  // console.log(JSON.stringify(result, null, 2));
  expect(result).toMatchObject({});
});
