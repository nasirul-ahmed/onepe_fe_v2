import { Inter } from "next/font/google";
import type { Metadata } from "next";
import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/globals.css";
import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/providers/AuthProvider";

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
      <body className={inter.className}>
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
