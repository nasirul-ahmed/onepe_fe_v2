import { Inter } from "next/font/google";
import type { Metadata } from "next";
import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/providers/AuthProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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
        <ServiceWorkerRegister />
        <ThemeProvider>
          <AppLayout>
            <PageTransition>
              <AuthProvider>{children}</AuthProvider>
            </PageTransition>
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
