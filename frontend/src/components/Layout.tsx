import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { LoginModal } from "./LoginModal";

export function Layout() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="page-shell">
      <div className="page inner-page">
        <Header onLoginClick={() => setLoginOpen(true)} />
        <Outlet context={{ openLogin: () => setLoginOpen(true) }} />
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
