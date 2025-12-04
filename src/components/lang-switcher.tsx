import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const current = i18n.language || "zh";

  const changeLang = (lng: "zh" | "ja") => {
    if (lng === current) return;
    void i18n.changeLanguage(lng);
  };

  const baseClass = "px-2 py-1 text-xs rounded-full";

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        text
        size="small"
        className={`${baseClass} ${current.startsWith("zh") ? "bg-primary-500/10 text-primary-500" : ""}`}
        onClick={() => changeLang("zh")}
      >
        简体中文
      </Button>
      <Button
        type="button"
        text
        size="small"
        className={`${baseClass} ${current.startsWith("ja") ? "bg-primary-500/10 text-primary-500" : ""}`}
        onClick={() => changeLang("ja")}
      >
        日本語
      </Button>
    </div>
  );
};

export default LangSwitcher;


