// import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../components/ThemeProvider";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Oallet",
//   description: "Your Personal Web3 Wallet.",
//   icons: [
//     {
//       rel: "icon",
//       type: "image/x-icon",
//       url: "/favicon-light.ico",
//       media: "(prefers-color-scheme: light)",
//     },
//     {
//       rel: "icon",
//       type: "image/png",
//       url: "/favicon-dark.ico",
//       media: "(prefers-color-scheme: dark)",
//     },
//   ],
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="lg:mx-60 mx-32">
            <Toaster />
            <Navbar></Navbar>
            {children}
          </div>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
