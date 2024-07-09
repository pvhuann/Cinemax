import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    template: '%s | Auth Cinema',
    default:'Auth Cinema'
  },
  description: "Next Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${inter.className} bg-black-1`}>{children}</body>
    </html>
  );
}
