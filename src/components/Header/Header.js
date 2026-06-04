"use client";

import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import { COOKIE_THEME_NAME, DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const handleThemeToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set(COOKIE_THEME_NAME, nextTheme, {
      expires: 1000,
    });

    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleThemeToggle}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
