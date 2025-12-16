import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../src/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life RPG - System",
  description: "Transforme sua vida em um RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(20, 20, 30, 0.95)',
                color: '#fff',
                border: '2px solid #00aaff',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}