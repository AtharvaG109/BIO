"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "atharva-site-theme";
const THEMES = ["dark", "light"];

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new CustomEvent("atharva-theme-change", { detail: theme }));
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (THEMES.includes(current)) {
      setTheme(current);
    } else {
      applyTheme("dark");
    }

    function handleThemeChange(event) {
      if (THEMES.includes(event.detail)) {
        setTheme(event.detail);
      }
    }

    function handleStorage(event) {
      if (event.key && event.key !== STORAGE_KEY) {
        return;
      }

      const nextTheme = document.documentElement.dataset.theme;
      if (THEMES.includes(nextTheme)) {
        setTheme(nextTheme);
      }
    }

    window.addEventListener("atharva-theme-change", handleThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("atharva-theme-change", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function handleSelect(nextTheme) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Choose color theme">
      <span className="theme-toggle-label">Theme</span>
      {THEMES.map((option) => (
        <button
          key={option}
          type="button"
          className={`theme-toggle-option ${theme === option ? "theme-toggle-option-active" : ""}`}
          aria-pressed={theme === option}
          title={option === "dark" ? "Use dark mode" : "Use light mode"}
          onClick={() => handleSelect(option)}
        >
          {option === "dark" ? "Dark" : "Light"}
        </button>
      ))}
    </div>
  );
}
