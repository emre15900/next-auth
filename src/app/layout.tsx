import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Next.js Auth0 Authentication",
  description: "Next.js ve Auth0 ile güvenli kimlik doğrulama sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AntdRegistry><ClientLayout>{children}</ClientLayout></AntdRegistry>

      </body>
    </html>
  );
}
