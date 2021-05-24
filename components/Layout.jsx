import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-8">{children}</main>
    </>
  );
}
