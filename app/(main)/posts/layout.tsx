export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose mx-auto lg:prose-lg prose-headings:font-display prose-h1:text-center">
      {children}
    </article>
  );
}
