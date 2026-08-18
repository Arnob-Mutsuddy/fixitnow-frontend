import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import AuthProvider from "@/providers/auth-provider";
import Navbar from "@/components/shared/navbar";
import "./globals.css";

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
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster richColors position="top-center" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}