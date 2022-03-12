import React, { Component } from "react";
import { Facebook, Twitter, Linkedin } from 'react-feather'

import styles from "./footer.module.css";

export class footer extends Component {
  render() {
    return (
      <footer className="text-gray-700">
        <div className="container py-8 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-gray-500">
            © 2020 Vidushan Chooriyakumaran
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              className={styles.social}
              href="https://www.facebook.com/vidushan.chooriyakumaran/"
            >
              <Facebook />
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
