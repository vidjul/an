import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./footer.module.css";

export class footer extends Component {
  render() {
    return (
      <footer className="text-gray-700 body-font bg-gray-100">
        <div className="container lg:px-32 px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
            © 2020 Vidushan Chooriyakumaran
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              className={styles.social}
              href="https://www.facebook.com/vidushan.chooriyakumaran/"
            >
              <FontAwesomeIcon icon={["fab", "facebook"]} size="lg" />
            </a>
            <a className={styles.social} href="https://twitter.com/vidushan_">
              <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
            </a>
            <a
              className={styles.social}
              href="https://www.linkedin.com/in/c-vidushan/"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} size="lg" />
            </a>
          </span>
        </div>
      </footer>
    );
  }
}

export default footer;
