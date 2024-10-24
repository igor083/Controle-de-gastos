// my-app/src/app/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu Din App",
  description: "Aplicativo de gestão financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
