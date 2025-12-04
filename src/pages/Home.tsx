import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/label/float";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Card className="rounded-3xl p-10 space-y-8 mx-6 my-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em]">
            {t("home.panel")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            {t("home.title")}
          </h1>
          <p className="mt-2 text-sm">
            {t("home.description")}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Card className="flex-1 min-w-48 p-4">
          <p className="text-xs uppercase tracking-wide">
            {t("home.highlightTitle")}
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {t("home.highlightValue")}
          </p>
        </Card>
        <Card className="flex-1 min-w-48 p-4">
          <p className="text-xs uppercase tracking-wide">
            {t("home.themeTitle")}
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {t("home.themeValue")}
          </p>
        </Card>
      </div>
      <FloatLabel>
        <InputText id="qq-input" />
        <label htmlFor="qq-input">
          {t("home.tencentIdLabel")}
        </label>
      </FloatLabel>
      <Button as={Link} to="/customizer" rounded className="w-fit">
        {t("home.openCustomizer")}
      </Button>
    </Card>
  );
};

export default Home;