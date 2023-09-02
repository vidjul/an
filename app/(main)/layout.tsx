import { Catamaran, Lato } from "next/font/google";

import "./globals.css";

import Header from "../../components/Header";

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
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white shadow-sm">
          <Header />
          <main className="flex-1 px-4 md:px-16">{children}</main>
          <footer className="px-4 py-8">Thanks for passing by!</footer>
        </div>
      </body>
    </html>
  );
}
