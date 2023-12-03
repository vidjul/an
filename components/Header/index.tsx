import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white px-4 py-8 font-display text-xl shadow-sm md:px-16">
      <span className="">vidu.sh</span>
      <Breadcrumbs />
    </header>
  );
};

export default Header;
