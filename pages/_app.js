import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
