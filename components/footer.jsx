import React, { Component } from "react";
import { Twitter, Linkedin, GitHub } from "react-feather";

import styles from "./footer.module.css";

export class footer extends Component {
  render() {
    return (
      <footer className="text-gray-700">
        <div className="container mx-auto flex flex-col items-center py-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            Thanks for passing by! - Vidushan C.
          </p>
          <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
            <a className={styles.social} href="https://github.com/vidjul">
              <GitHub />
            </a>
            <a className={styles.social} href="https://twitter.com/vidushan_">
              <Twitter />
            </a>
            <a
              className={styles.social}
              href="https://www.linkedin.com/in/c-vidushan/"
            >
              <Linkedin />
            </a>
          </span>
        </div>
      </footer>
    );
  }
}

export default footer;
