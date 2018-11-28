import SupportedFileTypes from './SupportedFileTypes';

it('SupportedFileTypes', () => {
  let fileTypes = [];
  SupportedFileTypes.forEach((item) => {
    const { extensions } = item;
    fileTypes = [
      ...fileTypes,
      ...extensions,
    ];
  });
  console.log(fileTypes.join(', ')); // eslint-disable-line
});
