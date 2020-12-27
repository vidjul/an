import "../styles/index.scss";
import Router from "next/router";
import withGA from "next-ga";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faAdjust,
  faArrowRight,
  faCalendar,
  faHamburger,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";

config.autoAddCss = false;
library.add(
  fab,
  faArrowRight,
  faHourglassHalf,
  faCalendar,
  faHamburger,
  faAdjust
);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withGA("UA-133354403-1", Router)(MyApp);
