import React from "react";

import Nav from "../components/nav";
import styles from "./DefaultLayout.module.scss";

export default function DefaultLayout({ children }) {
  return (
    <div className={styles.layout}>
      <div className="container mx-auto px-4">
        <Nav />
        <div className="px-4 py-20">
          <div className="max-w-2xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
