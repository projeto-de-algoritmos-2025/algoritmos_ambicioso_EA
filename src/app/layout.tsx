import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greed",
  description: "Trabalho de Programação e Algoritmos - Emerson Luis Teles dos Santos 200017322 - Arthur D`Assumpção Loureiro 190084570∂",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
      >
        {children}
      </body>
    </html>
  );
}
