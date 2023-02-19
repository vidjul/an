import "../styles/index.scss";

import Nav from "../components/nav";
import Footer from "../components/footer";

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
    <html lang="en">
      <body className="container mx-auto max-w-4xl px-4">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
