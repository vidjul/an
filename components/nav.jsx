import React, { Component } from "react";
import Link from "next/link";
import styles from "./nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeChanger from "./themeChanger";

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

    let menuClass =
      "lg:order-2 lg:block w-full lg:w-auto lg:flex lg:flex-wrap lg:items-center";

    if (!this.state.menuIsOpen) {
      menuClass += " hidden";
    }

    return (
      <div className="sticky top-0 w-full bg-white dark:bg-gray-800 shadow-sm z-10">
        <nav className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <div className="w-auto">
            <Link href="/">
              <a className={styles.logo}>
                vidu.sh<span className="highlight">/an</span>
              </a>
            </Link>
          </div>
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              <ThemeChanger />
              <button
                onClick={this.handleHamburgerClick}
                className="flex items-center py-2 px-3 text-blue-500 rounded border border-blue-500"
              >
                <FontAwesomeIcon icon="hamburger" />
              </button>
            </div>
          </div>
          <div className={menuClass}>
            <Link href="/">
              <a className={styles.navlink}>Home</a>
            </Link>
            <Link href="/about">
              <a className={styles.navlink}>About</a>
            </Link>
            <div className="hidden lg:block">
              <ThemeChanger />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
