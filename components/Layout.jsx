import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="px-8 mb-16">
        <div className="container mx-auto max-w-2xl">{children}</div>
      </main>
    </>
  );
}
