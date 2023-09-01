import { Lato, Catamaran } from "next/font/google";

import "./globals.css";

import Footer from "../../components/footer";
import Nav from "../../components/nav";
import { AnalyticsWrapper } from "../../components/analytics";

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
      <body className="mx-auto flex min-h-screen max-w-2xl flex-col bg-zinc-50">
        <header className="px-4 py-8">
          <span className="font-display text-xl font-bold">vidu.sh/an</span>
        </header>
        <main className="flex-1 px-4">
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, ab repellat? Dolore placeat, tenetur dolorem
            consectetur, non architecto repellat, quasi nam ad impedit officia
            consequatur! Quibusdam ipsum nemo ullam eaque.
          </p>

          <br />

          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
            illo blanditiis natus modi, labore eum nesciunt necessitatibus vitae
            ullam, tempora, quasi quae corrupti ea? Et reiciendis eum corporis.
            Id, eveniet!
          </p>

          <br />

          <p className="text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
            dolor, porro veniam soluta commodi vitae unde velit mollitia
            accusantium incidunt deleniti doloribus! Labore dolor et dolore
            quaerat culpa, repellendus aliquid!
          </p>

          <br />

          <p className="text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            esse rerum fugit consectetur illo, ratione hic dolorem doloremque at
            id mollitia ex repellendus labore tempore alias quidem excepturi
            voluptatem velit!
          </p>
        </main>
        <footer className="px-4 py-8">Thanks for passing by!</footer>
      </body>
    </html>
  );
}
