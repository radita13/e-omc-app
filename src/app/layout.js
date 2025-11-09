import { Poppins } from "next/font/google";
import "./globals.css";
import { ZustandInitializer } from "@/hooks/ZustandInitializer";
import Navbar from "@/components/shared/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "OMC - Oral Mukositis Care",
  description: "Aplikasi Perawatan Oral Mukositis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans`}>
        <ZustandInitializer />
        <main>{children}</main>
      </body>
    </html>
  );
}
