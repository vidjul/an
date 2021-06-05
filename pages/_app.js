import "../styles/globals.css";

/** FONTS */
import "@fontsource/quicksand";
import "@fontsource/lora/400-italic.css";
import "@fontsource/montserrat";
import "@fontsource/roboto";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
