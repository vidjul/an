import Link from "next/link";
import styles from "./nav.module.css";

const links = [
  { href: "https://github.com/vercel/next.js", label: "GitHub" },
  { href: "https://nextjs.org/docs", label: "Docs" },
];

export default function Nav() {
  return (
    <nav className="flex flex-wrap items-center justify-between p-4">
      <div className="w-auto">
        <Link href="/">
          <a className={styles.logo}>
            vidu.sh<span className="highlight">/an</span>
          </a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center py-2 px-3 text-teal-500 rounded border border-teal-500">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div className="hidden lg:order-3 lg:block w-full lg:w-2/5 lg:text-right">
        <Link href="/">
          <a className={styles.navlink}>Home</a>
        </Link>
        <Link href="/about">
          <a className={styles.navlink}>About</a>
        </Link>
      </div>
    </nav>
  );
}
