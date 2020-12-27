import "../styles/index.scss";
import Router from "next/router";
import withGA from "next-ga";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCalendar,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(fab, faArrowRight, faHourglassHalf, faCalendar);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withGA("UA-133354403-1", Router)(MyApp);
