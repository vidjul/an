"use client";

import React, { Component } from "react";
import Link from "next/link";

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
    let menuClass = "lg:flex justify-end gap-10";

    if (!this.state.menuIsOpen) {
      menuClass += " hidden";
    }

    return (
      <div className="sticky top-0 z-50 mb-8 bg-white py-8">
        <nav className="flex flex-wrap items-center justify-between">
          <div className="w-auto">
            <Link href="/" className="font-display text-xl font-semibold">
              vidu.sh<span className="text-green-500">/an</span>
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={this.handleHamburgerClick}
              className="flex items-center rounded border border-teal-500 py-2 px-3 text-teal-500"
            >
              <svg
                className="h-3 w-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <div className={menuClass}>
            <Link
              href="/"
              className="mt-4 block text-teal-900 hover:text-teal-700 lg:mt-0 lg:inline-block"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="mt-4 block text-teal-900 hover:text-teal-700 lg:mt-0 lg:inline-block"
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
