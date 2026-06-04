import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import { MotionConfig } from "motion/react";
import { cookies } from "next/headers";

import { LIGHT_TOKENS, DARK_TOKENS, COOKIE_THEME_NAME } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

async function RootLayout({ children }) {
  const savedTheme = (await cookies()).get(COOKIE_THEME_NAME);
  const theme = savedTheme?.value || "light";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <MotionConfig reducedMotion="user">
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}

export default RootLayout;
