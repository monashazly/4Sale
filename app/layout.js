"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
