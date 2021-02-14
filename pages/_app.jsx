import "../styles/index.css";
import Router from "next/router";
import withGA from "next-ga";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faAdjust,
  faArrowRight,
  faAt,
  faCalendar,
  faEnvelope,
  faHamburger,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";

import "@fontsource/rubik";
import "@fontsource/sintony";
import "@fontsource/poppins";

config.autoAddCss = false;
library.add(
  fab,
  faArrowRight,
  faHourglassHalf,
  faCalendar,
  faHamburger,
  faAdjust,
  faEnvelope
);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withGA("UA-133354403-1", Router)(MyApp);
