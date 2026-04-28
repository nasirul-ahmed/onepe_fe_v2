import { Inter } from "next/font/google";
import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import type { Metadata } from "next";
import "@/styles/globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnePe - Once & for all Payment",
  description: "Modern financial app for all your payment needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AppLayout>
            <QueryProvider>
              <AuthProvider>
                <PageTransition>{children}</PageTransition>
              </AuthProvider>
            </QueryProvider>
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
