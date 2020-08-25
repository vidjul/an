import "../styles/index.scss";
import Router from "next/router";
import withGA from "next-ga";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withGA("UA-133354403-1", Router)(MyApp);
