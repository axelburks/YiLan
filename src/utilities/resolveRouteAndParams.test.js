import resolveRouteAndParams from './resolveRouteAndParams';

it('resolveRouteAndParams-case1', () => {
  const textPreviewerData = { type: 'text' };
  const data = resolveRouteAndParams({ type: 'text' });
  expect(data).toMatchObject({ routeName: 'PreviewOfUnsupported', params: textPreviewerData });
});

it('resolveRouteAndParams-case2', () => {
  const urlPreviewerData = { type: 'url' };
  const data = resolveRouteAndParams(urlPreviewerData);
  expect(data).toMatchObject({ routeName: 'PreviewOfUnsupported', params: urlPreviewerData });
});

it('resolveRouteAndParams-case3', () => {
  const previewOfCodeData = { type: 'file', extraFilePath: 'test.zip' };
  const data = resolveRouteAndParams(previewOfCodeData);
  expect(data).toMatchObject({ routeName: 'PreviewOfArchive', params: previewOfCodeData });
});

it('resolveRouteAndParams-case4', () => {
  const previewOfCodeData = { type: 'file', extraFilePath: 'test.js' };
  const data = resolveRouteAndParams(previewOfCodeData);
  expect(data).toMatchObject({ routeName: 'PreviewOfCode', params: previewOfCodeData });
});
