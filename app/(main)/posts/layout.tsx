export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose prose-headings:font-display lg:prose-xl">
      {children}
    </article>
  );
}
