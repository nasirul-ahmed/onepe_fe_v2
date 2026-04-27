import { Inter } from "next/font/google";
import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import AuthProvider from "@/components/providers/AuthProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { QueryProvider } from "@/components/providers/QueryProvider";
import type { Metadata } from "next";
import "@/styles/globals.css";

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
              <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
              </QueryProvider>
            </PageTransition>
          </AppLayout>
        </ThemeProvider>

        {/* <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        /> */}
      </body>
    </html>
  );
}
