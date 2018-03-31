export default {
  appName: '佚览',
  globals: {
    types: {
      text: '文本',
      url: '链接',
      file: '文件',
    },
  },
  components: {
    dialog: {
      ok: '确定',
      cancel: '取消',
      yes: '是',
      no: '否',
    },
  },
  screens: {
    archivePreviewer: {
      title: '归档预览',
      messageListEmptyTitle: '目录为空',
      messageListEmptyMessage: '',
    },
    codePreviewer: {
      title: '代码预览',
    },
    home: {
      title: '佚览',
      messageListEmptyTitle: '无历史',
      messageListEmptyMessage: '',
    },
    htmlPreviewer: {
      title: '网页预览',
    },
    markdownPreviewer: {
      title: 'Markdown 预览',
    },
    pdfPreviewer: {
      title: 'PDF 预览',
    },
    settings: {
      title: '设置',
      listSectionItemGeneral: '常规',
      listSectionItemHelpAndFeedback: '帮助和反馈',
      listSectionItemMore: '更多',
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
    textQuerier: {
      title: '文本查询',
    },
    unsupported: {
      title: '暂不支持',
      messageUnsupportedTitle: '佚览暂不可以查看此类文件',
      messageUnsupportedMessage: '',
      buttonPreviewInCodePreviewer: '在代码预览器中预览',
    },
    userGuide: {
      title: '用户指南',
    },
  },
};
