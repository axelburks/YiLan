import ArchivePreviewerSupportedFileTypes from '../screens/ArchivePreviewer/SupportedFileTypes';
import CodePreviewerSupportedFileTypes from '../screens/CodePreviewer/SupportedFileTypes';
import HtmlPreviewerSupportedFileTypes from '../screens/HtmlPreviewer/SupportedFileTypes';
import MarkdownPreviewerSupportedFileTypes from '../screens/MarkdownPreviewer/SupportedFileTypes';
import PdfPreviewerSupportedFileTypes from '../screens/PdfPreviewer/SupportedFileTypes';

const resolveRouteAndParams = (previewData) => {
  const { type } = previewData;
  if (type === 'text') {
    return { routeName: 'Unsupported', params: previewData };
  }
  if (type === 'url') {
    return { routeName: 'Unsupported', params: previewData };
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
    if (ArchivePreviewerSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'ArchivePreviewer', params: previewData };
    }
    if (MarkdownPreviewerSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'MarkdownPreviewer', params: previewData };
    }
    if (PdfPreviewerSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'PdfPreviewer', params: previewData };
    }
    if (HtmlPreviewerSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'HtmlPreviewer', params: previewData };
    }
    if (CodePreviewerSupportedFileTypes.findIndex(findIndexFn) >= 0) {
      return { routeName: 'CodePreviewer', params: previewData };
    }
  }

  return { routeName: 'Unsupported', params: previewData };
};

export default resolveRouteAndParams;
