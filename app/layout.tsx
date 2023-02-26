import { Lato, Catamaran } from "next/font/google";

import "../styles/index.scss";

import Footer from "../components/footer";
import Nav from "../components/nav";
import { AnalyticsWrapper } from "../components/analytics";

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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/an/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/an/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/an/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/an/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/an/android-chrome-512x512.png"
        />
        <link rel="shortcut icon" href="/an/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="bg-zinc-50">
        <div className="container mx-auto max-w-7xl bg-white shadow-sm lg:px-8">
          <div className="px-12">
            <Nav />
            {children}
            <Footer />
            <AnalyticsWrapper />
          </div>
        </div>
      </body>
    </html>
  );
}
