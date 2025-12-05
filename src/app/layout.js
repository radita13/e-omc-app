import { Poppins } from "next/font/google";
import "./globals.css";
import { ZustandInitializer } from "@/hooks/ZustandInitializer";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "OMC - Oral Mukositis Care",
    template: "%s | OMC - Oral Mukositis Care",
  },
  description: "Aplikasi Perawatan Oral Mukositis",
  icons: {
    icon: "/images/iconwebomc.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans`}>
        <ZustandInitializer />
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
