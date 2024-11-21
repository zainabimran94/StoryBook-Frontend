import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import Navbar from "@/components/navbar";
import Head  from "next/head";

export const metadata: Metadata = {
  title: "Children StoryBook App",
  description: "An app for children to generate their own stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Add the viewport meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body> 
      <AuthProvider> 
      <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
