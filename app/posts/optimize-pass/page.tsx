import Post from "./post";

export const metadata = {
  title: "Optimize pass for WSL, Ubuntu and Android",
  description: "Some tips to make better use of PassThrough",
  date: "2020-01-05",
};

export default function Page() {
  return (
    <>
      <h1>{metadata.title}</h1>
      <Post />
    </>
  );
}
