import resolveRouteAndParams from './resolveRouteAndParams';

it('resolveRouteAndParams-case1', () => {
  const textPreviewerData = { type: 'text' };
  const data = resolveRouteAndParams({ type: 'text' });
  expect(data).toMatchObject({ routeName: 'Unsupported', params: textPreviewerData });
});

it('resolveRouteAndParams-case2', () => {
  const urlPreviewerData = { type: 'url' };
  const data = resolveRouteAndParams(urlPreviewerData);
  expect(data).toMatchObject({ routeName: 'Unsupported', params: urlPreviewerData });
});

it('resolveRouteAndParams-case3', () => {
  const codePreviewerData = { type: 'file', extraFilePath: 'test.zip' };
  const data = resolveRouteAndParams(codePreviewerData);
  expect(data).toMatchObject({ routeName: 'ArchivePreviewer', params: codePreviewerData });
});

it('resolveRouteAndParams-case4', () => {
  const codePreviewerData = { type: 'file', extraFilePath: 'test.js' };
  const data = resolveRouteAndParams(codePreviewerData);
  expect(data).toMatchObject({ routeName: 'CodePreviewer', params: codePreviewerData });
});
