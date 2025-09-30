import { Link, Outlet, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles/styles.scss";

export default function App() {
  const nav = useNavigation();
  const isLoading = nav.state === "loading";

  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="app">
      <header className="container header">
        <Link to="/" className="brand">
          ♟️ GM Wiki
        </Link>
        <button
          className="btn"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {isLoading && <div className="topbar-loader" />}

      <main className="container">
        <Outlet />
      </main>

      <footer className="container footer">
        Built with the public Chess.com API
      </footer>
    </div>
  );
}
