export default {
  globals: {
    buttonOk: '确定',
    buttonCancel: '取消',
    buttonYes: '是',
    buttonNo: '否',
    types: {
      text: '文本',
      url: '链接',
      file: '文件',
    },
  },
  screens: {
    home: {
      title: '佚览',
      messageListEmptyTitle: '暂无历史记录',
      messageListEmptyMessage: ' ',
    },
    previewOfArchive: {
      title: '归档',
      placeholderArchivePassword: '请输入解压密码',
      messageListEmptyMessage: '目录为空',
      messageArchiveEncryptedTitle: '归档已加密',
      buttonUnarchive: '解压缩',
    },
    previewOfCode: {
      title: '代码',
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
      title: '纯文本',
      messageListEmptyTitle: '暂不支持查看此类文件',
      messageListEmptyMessage: ' ',
    },
    previewOfUnsupported: {
      title: '暂不支持',
      messageListEmptyTitle: '暂不支持查看此类文件',
      messageListEmptyMessage: ' ',
      buttonPreviewInPreviewOfCode: '用代码预览器查看',
    },
    settings: {
      title: '设置',
      listSectionItemGeneral: '常规',
      listSectionItemHelpAndFeedback: '帮助和反馈',
      listSectionItemOther: '其他',
      listItemUserGuide: '如何使用插件',
      listItemClearCache: '清理缓存',
      listItemClearCacheDetailText: '如遇到奇怪问题，戳这里尝试解决',
      listItemGetSupport: '获取支持',
      listItemSuggestions: '建议功能',
      listItemShare: '推荐',
      listItemShareDetailText: '和您的朋友们一起体验',
      listItemStoreReview: '评分',
      listItemStoreReviewDetailText: '在 App Store 为我们评分',
      labelRevisionNumber: '修订编号',
      getSupportMailSubject: '佚览反馈',
      getSupportMailBody: '在此写下你的问题',
      shareMessage: '佚览 - 让你的智能手机更好用',
      messageClearCacheCompletion: '缓存清理完成',
      messageManualGetSupport: '请将您的问题发送至 lijy91@foxmail.com',
    },
  },
  views: {
    unsafeModeView: {
      messageTitle: '应用警告',
      messageMessage: '由于扩展应用运行内存的限制，\n在查看大文件时会存在闪退情况。',
      buttonContinue: '继续查看',
    },
  },
};
