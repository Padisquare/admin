import { satoshi } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "PadiSquare | Admin page",
  description: "padisquare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${satoshi.variable} ${satoshi.className} antialiased`}
          >
            <Toaster />
            {children}
          </body>
        </html>
      </AuthProvider>
    </Providers>
  );
}