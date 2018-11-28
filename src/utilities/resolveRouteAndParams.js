import PreviewOfArchiveSupportedFileTypes from '../screens/PreviewOfArchive/SupportedFileTypes';
import PreviewOfCodeSupportedFileTypes from '../screens/PreviewOfCode/SupportedFileTypes';
import PreviewOfHtmlSupportedFileTypes from '../screens/PreviewOfHtml/SupportedFileTypes';
import PreviewOfImageSupportedFileTypes from '../screens/PreviewOfImage/SupportedFileTypes';
import PreviewOfMarkdownSupportedFileTypes from '../screens/PreviewOfMarkdown/SupportedFileTypes';
import PreviewOfPdfSupportedFileTypes from '../screens/PreviewOfPdf/SupportedFileTypes';


const resolveRouteAndParams = (previewData) => {
  const { type } = previewData;
  if (type === 'text') {
    return { routeName: 'PreviewOfPlainText', params: previewData };
  }
  if (type === 'url') {
    return { routeName: 'PreviewOfUnsupported', params: previewData };
  }
  if (type === 'file') {
    const {
      extraFileName: fileName,
      extraFilePath: filePath,
    } = previewData;
    const fileExtension = filePath.substr(filePath.lastIndexOf('.'));
    const findIndexFn = (item) => {
      const fileNames = item.names || [];
      const fileExtensions = item.extensions || [];
      return fileNames.includes(fileName) || fileExtensions.includes(fileExtension);
    };
    if (PreviewOfArchiveSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PreviewOfArchive', params: previewData };
    }
    if (PreviewOfHtmlSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PreviewOfHtml', params: previewData };
    }
    if (PreviewOfImageSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PreviewOfImage', params: previewData };
    }
    if (PreviewOfMarkdownSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PreviewOfMarkdown', params: previewData };
    }
    if (PreviewOfPdfSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PreviewOfPdf', params: previewData };
    }
    if (PreviewOfCodeSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PreviewOfCode', params: previewData };
    }
  }

  return { routeName: 'PreviewOfUnsupported', params: previewData };
};

export default resolveRouteAndParams;
