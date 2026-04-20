"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "atharva-site-theme";
const THEMES = ["dark", "light"];

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (THEMES.includes(current)) {
      setTheme(current);
      return;
    }

    applyTheme("dark");
  }, []);

  function handleSelect(nextTheme) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Choose color theme">
      {THEMES.map((option) => (
        <button
          key={option}
          type="button"
          className={`theme-toggle-option ${theme === option ? "theme-toggle-option-active" : ""}`}
          aria-pressed={theme === option}
          onClick={() => handleSelect(option)}
        >
          {option === "dark" ? "Dark" : "Light"}
        </button>
      ))}
    </div>
  );
}
