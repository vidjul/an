export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="prose mx-auto prose-headings:font-display lg:prose-xl">
      {children}
    </main>
  );
}
