import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ja: {
    translation: {
      common: {
        optionCount: "{{count}} 項目",
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
        tencentIdLabel: "QQ ID",
        openCustomizer: "スタイル設定を開く",
      },
      customizer: {
        backgroundLayer: "背景",
        rank: "ランク スタイル",
        dan: "段位",
        class: "オトモダチ対戦クラス",
        collectibles: "コレクション",
        collectiblesHint:
          "ヒント：各項目の右側にある虫眼鏡ボタンをクリックして、リストからネームプレート/アイコン/フレームを選択する。",
        modeTitle: "モード",
        modeRecommend: "おすすめ定数表",
        modeChara: "つあーメンバー",
        recommendTitle: "推荐框体",
        travelPartnerPlaceholder: "つあーメンバー",
        levelPlaceholder: "レベル (1-9999)",
        dialogChoosePlate: "ネームプレート",
        dialogChooseIcon: "アイコン",
        dialogChooseFrame: "フレーム",
        dialogChooseCategoryLabel: "カテゴリー",
        dialogChooseItemLabel: "項目",
        dialogChooseCategoryPlaceholder: "カテゴリーを選んでください",
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
        highlightValue: "更丰富的样式设置",
        themeTitle: "团队",
        themeValue: "XrayBot Team",
        tencentIdLabel: "QQ 号",
        openCustomizer: "打开样式设置",
      },
      customizer: {
        backgroundLayer: "背景",
        rank: "评价样式",
        dan: "段位",
        class: "友人对战阶级",
        collectibles: "收藏品",
        collectiblesHint:
          "提示：点击每一项右侧的放大镜按钮，从列表中选择对应的姓名框 / 头像 / 框体。",
        modeTitle: "Recommend / Chara 配置模式",
        modeRecommend: "推荐模式",
        modeChara: "角色模式",
        recommendTitle: "推荐框体",
        travelPartnerPlaceholder: "旅行伙伴",
        levelPlaceholder: "等级 (1-9999)",
        dialogChoosePlate: "选择姓名框",
        dialogChooseIcon: "选择头像",
        dialogChooseFrame: "选择框体",
        dialogChooseCategoryLabel: "分类",
        dialogChooseItemLabel: "项目",
        dialogChooseCategoryPlaceholder: "请先选择一个分类",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "jp",
  fallbackLng: "jp",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;


