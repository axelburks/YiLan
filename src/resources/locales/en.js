export default {
  appName: 'YiLan',
  globals: {
    types: {
      text: 'Text',
      url: 'Url',
      file: 'File',
    },
  },
  components: {
    dialog: {
      ok: 'Ok',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No',
    },
  },
  screens: {
    archivePreviewer: {
      title: 'Archive Preview',
      messageListEmptyTitle: 'Unsupported',
      messageListEmptyMessage: '',
    },
    codePreviewer: {
      title: 'Code Preview',
    },
    home: {
      title: 'YiLan',
      messageListEmptyTitle: 'No history',
      messageListEmptyMessage: '...',
    },
    htmlPreviewer: {
      title: 'HTML Preview',
    },
    markdownPreviewer: {
      title: 'Markdown Preview',
    },
    pdfPreviewer: {
      title: 'PDF Preview',
    },
    settings: {
      title: 'Settings',
      listSectionItemGeneral: 'General',
      listSectionItemHelpAndFeedback: 'Help & Feedback',
      listSectionItemMore: 'More',
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
    textQuerier: {
      title: 'Text Querier',
    },
    unsupported: {
      title: 'Unsupported',
      messageUnsupportedTitle: 'Unsupported',
      messageUnsupportedMessage: '',
      buttonPreviewInCodePreviewer: 'Preview in code previewer',
    },
    userGuide: {
      title: 'User Guide',
    },
  },
};
