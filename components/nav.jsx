import React, { Component } from "react";
import Link from "next/link";
import styles from "./nav.module.css";

export default class nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsOpen: false,
      hamburgerClass: "",
    };

    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
  }

  handleHamburgerClick() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  }

  render() {
    const links = [
      { href: "https://github.com/vercel/next.js", label: "GitHub" },
      { href: "https://nextjs.org/docs", label: "Docs" },
    ];

    let menuClass = "lg:order-3 lg:block w-full lg:w-2/5 lg:text-right";

    if (!this.state.menuIsOpen) {
      menuClass += " hidden";
    }

    return (
      <div className="sticky top-0 w-full bg-white shadow-sm z-10">
        <nav className="container mx-auto flex flex-wrap items-center justify-between px-32 py-4">
          <div className="w-auto">
            <Link href="/">
              <a className={styles.logo}>
                vidu.sh<span className="highlight">/an</span>
              </a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={this.handleHamburgerClick}
              className="flex items-center py-2 px-3 text-teal-500 rounded border border-teal-500"
            >
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
          <div className={menuClass}>
            <Link href="/">
              <a className={styles.navlink}>Home</a>
            </Link>
            <Link href="/about">
              <a className={styles.navlink}>About</a>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
