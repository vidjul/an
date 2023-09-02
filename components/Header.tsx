import Link from "next/link";

const Header = () => {
  return (
    <header className="px-4 py-8 md:px-16">
      <span className="font-display text-xl font-bold">
        vidu.sh
        <Link href="/" className="text-blue-500 hover:underline">
          /an
        </Link>
      </span>
    </header>
  );
};

export default Header;
