import Particle from "../components/particle";
import "./globals.css";
import React from "react";
import * as dotenv from "dotenv";
dotenv.config();

export const metadata = {
  title: "Portfolio",
  description: "AlbaNagisa portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="w-screen min-h-screen h-fit flex bg-gradient-to-b from-[#091645] to-[#2a2575] bg">
        {children}
        <Particle />
      </body>
    </html>
  );
}
