import { Lato, Catamaran } from "@next/font/google";

import "../styles/index.scss";

import Footer from "../components/footer";
import Nav from "../components/nav";

const catamaran = Catamaran({
  subsets: ["latin"],
  variable: "--font-catamaran",
});
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lato",
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
    <html lang="en" className={`${catamaran.variable} ${lato.variable}`}>
      <body className="container mx-auto max-w-4xl px-4">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
