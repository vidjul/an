import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./footer.module.css";

export class footer extends Component {
  render() {
    return (
      <footer className="text-gray-700 body-font bg-gray-100">
        <div className="container p-4 mx-auto flex items-center justify-between flex-col lg:flex-row">
          <p className="text-sm text-gray-500 mb-2 lg:mb-0">
            © 2020 Vidushan Chooriyakumaran
          </p>
          <span className="inline-flex">
            <a
              className={styles.social}
              href="https://www.facebook.com/vidushan.chooriyakumaran/"
            >
              <FontAwesomeIcon
                icon={["fab", "facebook"]}
                size="lg"
                className="flex-1"
              />
            </a>
            <a className={styles.social} href="https://twitter.com/vidushan_">
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                size="lg"
                className="flex-1"
              />
            </a>
            <a
              className={styles.social}
              href="https://www.linkedin.com/in/c-vidushan/"
            >
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                size="lg"
                className="flex-1"
              />
            </a>
          </span>
        </div>
      </footer>
    );
  }
}

export default footer;
