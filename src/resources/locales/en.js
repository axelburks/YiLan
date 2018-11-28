export default {
  globals: {
    buttonOk: 'OK',
    buttonCancel: 'Cancel',
    buttonYes: 'Yes',
    buttonNo: 'No',
    types: {
      text: 'Text',
      url: 'Url',
      file: 'File',
    },
  },
  screens: {
    home: {
      title: 'YiLan',
      messageListEmptyTitle: 'No history',
      messageListEmptyMessage: '',
    },
    previewOfArchive: {
      title: 'Archive',
      placeholderArchivePassword: 'Please enter password',
      messageListEmptyMessage: 'Directory is empty',
      messageArchiveEncryptedTitle: 'Archive is encrypted',
      buttonUnarchive: 'Unarchive',
    },
    previewOfCode: {
      title: 'Code',
    },
    previewOfHtml: {
      title: 'HTML',
    },
    previewOfMarkdown: {
      title: 'Markdown',
    },
    previewOfPdf: {
      title: 'PDF',
    },
    previewOfPlainText: {
      title: 'Plain Text',
      messageListEmptyTitle: 'Unsupported',
      messageListEmptyMessage: ' ',
    },
    previewOfUnsupported: {
      title: 'Unsupported',
      messageListEmptyTitle: 'Unsupported',
      messageListEmptyMessage: '',
      buttonPreviewInPreviewOfCode: 'Preview in code previewer',
    },
    settings: {
      title: 'Settings',
      listSectionItemGeneral: 'General',
      listSectionItemHelpAndFeedback: 'Help & Feedback',
      listSectionItemOther: 'Other',
      listItemUserGuide: 'How to use the app extension',
      listItemClearCache: 'Clear Cache',
      listItemClearCacheDetailText: '',
      listItemGetSupport: 'Get Support',
      listItemSuggestions: 'Suggestions',
      listItemShare: 'Share',
      listItemShareDetailText: '',
      listItemStoreReview: 'Store Review',
      listItemStoreReviewDetailText: '',
      labelRevisionNumber: 'Revision number',
      getSupportMailSubject: 'YiLan Feedback',
      getSupportMailBody: 'Write your question here',
      shareMessage: 'YiLan',
      messageClearCacheCompletion: 'Cache clear completion.',
      messageManualGetSupport: 'Please sent you question to lijy91@foxmail.com',
    },
  },
  views: {
    unsafeModeView: {
      messageTitle: 'Warning',
      messageMessage: '由于扩展应用运行内存的限制，\n在查看大文件时会存在闪退情况。',
      buttonContinue: 'Continue',
    },
  },
};
