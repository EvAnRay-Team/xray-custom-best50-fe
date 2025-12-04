import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: {
      common: {
        optionCount: "{{count}} 個のオプション",
      },
      header: {
        dashboard: "ダッシュボード",
        customizer: "スタイル設定",
      },
      home: {
        panel: "コントロールパネル",
        title: "XrayTeam フロントエンド研究室",
        description: "現在のテーマ状態を表示し、スタイル設定ページへ移動できます。",
        highlightTitle: "ハイライト",
        highlightValue: "PrimeReact ベース",
        themeTitle: "テーマ",
        themeValue: "Noir プリセット",
        tencentIdLabel: "Tencent ID",
        openCustomizer: "スタイル設定を開く",
      },
      customizer: {
        backgroundLayer: "背景レイヤー",
        rank: "rank",
        dan: "dan",
        class: "class",
        collectibles: "collectibles",
        collectiblesHint:
          "提示：点击每一项右侧的放大镜按钮，从列表中选择对应的姓名框 / 头像 / 框体。",
        modeTitle: "Recommend / Chara 配置模式",
        modeRecommend: "Recommend",
        modeChara: "Chara",
        recommendTitle: "推荐框体",
        travelPartnerPlaceholder: "旅行パートナー",
        levelPlaceholder: "レベル (1-9999)",
        dialogChoosePlate: "选择姓名框",
        dialogChooseIcon: "选择头像",
        dialogChooseFrame: "选择框体",
        dialogChooseCategoryLabel: "选择分类",
        dialogChooseItemLabel: "选择项目",
        dialogChooseCategoryPlaceholder: "请先选择一个分类",
      },
    },
  },
  zh: {
    translation: {
      common: {
        optionCount: "{{count}} 选项",
      },
      header: {
        dashboard: "仪表盘",
        customizer: "样式设置",
      },
      home: {
        panel: "控制面板",
        title: "XrayTeam 前端研究室",
        description: "可以查看当前主题状态，并进入样式配置页。",
        highlightTitle: "亮点",
        highlightValue: "基于 PrimeReact",
        themeTitle: "主题",
        themeValue: "Noir 预设",
        tencentIdLabel: "腾讯 QQ / Tencent ID",
        openCustomizer: "打开样式设置",
      },
      customizer: {
        backgroundLayer: "背景图层",
        rank: "段位 RANK",
        dan: "段位 DAN",
        class: "段位 CLASS",
        collectibles: "收藏品",
        collectiblesHint:
          "提示：点击每一项右侧的放大镜按钮，从列表中选择对应的姓名框 / 头像 / 框体。",
        modeTitle: "Recommend / Chara 配置模式",
        modeRecommend: "推荐模式",
        modeChara: "角色模式",
        recommendTitle: "推荐框体",
        travelPartnerPlaceholder: "旅行搭档",
        levelPlaceholder: "等级 (1-9999)",
        dialogChoosePlate: "选择姓名框",
        dialogChooseIcon: "选择头像",
        dialogChooseFrame: "选择框体",
        dialogChooseCategoryLabel: "选择分类",
        dialogChooseItemLabel: "选择项目",
        dialogChooseCategoryPlaceholder: "请先选择一个分类",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;


