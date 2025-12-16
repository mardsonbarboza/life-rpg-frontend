import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../src/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Life RPG - Transform Your Life",
  description: "Transforme sua vida em um RPG épico com quests, conquistas e evolução constante",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(10, 10, 20, 0.95)',
                color: '#fff',
                border: '2px solid rgba(0, 170, 255, 0.5)',
                borderRadius: '16px',
                backdropFilter: 'blur(30px)',
                padding: '16px 20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 170, 255, 0.15)',
                fontWeight: '600',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#00ff88',
                  secondary: '#fff',
                },
                style: {
                  border: '2px solid rgba(0, 255, 136, 0.5)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff3333',
                  secondary: '#fff',
                },
                style: {
                  border: '2px solid rgba(255, 51, 51, 0.5)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 51, 51, 0.2)',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#00aaff',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}