"use client";

import React from "react";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Currency Exchange</title>
        <head>
          <title>Currency Exchange</title>
          <link rel="preload" as="image" href="/image.png" type="image/png" />
        </head>
      </head>
      <body
      >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
