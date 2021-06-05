import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="px-8">
        <div className="container mx-auto max-w-2xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}
