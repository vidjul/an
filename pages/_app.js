import "../styles/globals.css";

/** FONTS */
import "typeface-lora";
import "typeface-montserrat";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
