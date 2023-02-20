import { Inter, Roboto } from "@next/font/google";

import "../styles/index.scss";

import Footer from "../components/footer";
import Nav from "../components/nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: {
    template: "%s | Vidushan Chooriyakumaran",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="container mx-auto max-w-4xl px-4">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
