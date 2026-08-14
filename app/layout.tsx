import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import QueryProvider from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "FixItNow — Your Trusted Home Service Platform",
  description: "Book qualified technicians for home services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          {children}
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}