import PropTypes from "prop-types";

import { Container } from "next/app";

import { DefaultSeo } from "next-seo";

import "../styles/globals.css";

/** FONTS */
import "@fontsource/quicksand";
import "@fontsource/lora/400-italic.css";
import "@fontsource/montserrat";
import "@fontsource/roboto";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <DefaultSeo titleTemplate="%s | Vidushan C." />
      <Component {...pageProps} />;
    </Container>
  );
}

export default appWithTranslation(MyApp);

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};
