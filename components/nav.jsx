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
      <div className="sticky top-0 w-full bg-secondary dark:bg-secondary-dark z-10">
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
                className="flex items-center py-2 px-3 text-primary rounded border border-primary"
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
