import { Inter } from "next/font/google";
import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import type { Metadata } from "next";
import "@/styles/globals.css";
import React, { Suspense } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Work_Sans } from "next/font/google";
import { LoaderProvider } from "@/components/providers/LoaderProvider";
import OnepeLiquidLoader from "@/components/OnePeLoader";

const inter = Inter({ subsets: ["latin"] });

const rocky = localFont({
  src: "./fonts/rocky.ttf",
  variable: "--font-rocky",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

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
      <body
        className={cn(workSans.className, rocky.variable, workSans.variable)}
      >
        <Suspense fallback={<OnepeLiquidLoader />}>
          <ThemeProvider>
            <QueryProvider>
              <LoaderProvider />
              <AuthProvider>
                <AppLayout>
                  <PageTransition>{children}</PageTransition>
                </AppLayout>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
