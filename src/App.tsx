import { NavLink, Route, Routes } from "react-router-dom";
import ThemeSwitcher from "./components/theme-switcher";
import LangSwitcher from "./components/lang-switcher";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import { Toolbar } from "primereact/toolbar";
import { useTranslation } from "react-i18next";

const SiteHeader = () => {
  const { t } = useTranslation();
  return (
    <Toolbar className="!px-0">
      <div style={{ display: "flex", flexDirection: "row", textAlign: "center", alignItems: "center" }}>
        <span className="hidden md:inline-block text-lg font-semibold tracking-wide px-4">xRay Studio</span>
        <nav className="flex gap-5">
          <NavLink
            to="/xray-custom-best50-fe/"
            end
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition text-sm font-medium ${
                isActive
                  ? "bg-primary-500/10 text-primary-500"
                  : "text-surface-500 hover:text-surface-900 dark:hover:text-surface-0"
              }`
            }
          >
            {t("header.dashboard")}
          </NavLink>
          <NavLink
            to="/xray-custom-best50-fe/customizer"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition text-sm font-medium ${
                isActive
                  ? "bg-primary-500/10 text-primary-500"
                  : "text-surface-500 hover:text-surface-900 dark:hover:text-surface-0"
              }`
            }
          >
            {t("header.customizer")}
          </NavLink>
        </nav>
      </div>
      <div className="px-4 flex items-center gap-3">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </Toolbar>
  );
};

function App() {
  const renderRoutes = () => (
    <Routes>
      <Route path="/xray-custom-best50-fe/" element={<Home />} />
      <Route path="/xray-custom-best50-fe/customizer" element={<Customizer />} />
    </Routes>
  );

  return (
    // <>  </>
    <div className="min-h-screen from-surface-50 to-surface-100  text-surface-900 dark:text-surface-0 font-[family-name:var(--font-geist-sans)]">
      <SiteHeader />
      <main style={{width: "90%"}} className="mx-auto">
        {renderRoutes()}
      </main>
    </div>
  );
}

export default App;
