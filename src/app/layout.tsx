import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from "./../MySessionProvider/MySessionProvider";
import CartContextProvider from "@/context/CartContext";
import WishContextProvider from "@/context/WishContext";
import { ThemeProvider } from "next-themes";
import Footer from "./_components/Footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Mart",
  description: "Your one-stop shop for all things fresh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MySessionProvider>
            <CartContextProvider>
              <WishContextProvider>
                <Navbar />
                <div className="min-h-[calc(100vh-5rem)]">
                  {children}
                </div>
                <Toaster />
                <Footer />
              </WishContextProvider>
            </CartContextProvider>
          </MySessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
