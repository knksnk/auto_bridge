import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { CabinetPage } from "./pages/CabinetPage";
import { CatalogPage } from "./pages/CatalogPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HomePage } from "./pages/HomePage";
import { PartnerLandingPage } from "./pages/PartnerLandingPage";
import { PartnersPage } from "./pages/PartnersPage";
import { RegisterPage } from "./pages/RegisterPage";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
}

export function App() {
  useRevealOnScroll();

  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/seller" element={<PartnerLandingPage kind="seller" />} />
          <Route path="/carrier" element={<PartnerLandingPage kind="carrier" />} />
          <Route path="/auth" element={<RegisterPage />} />
          <Route path="/cabinet" element={<CabinetPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
