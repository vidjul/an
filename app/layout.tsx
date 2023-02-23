import { Lato, Catamaran } from "next/font/google";

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
      <body className="bg-zinc-50">
        <div className="container mx-auto max-w-7xl bg-white shadow-sm lg:px-8">
          <div className="px-12">
            <Nav />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
