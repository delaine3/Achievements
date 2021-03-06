import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Achievement App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a className="page">Home</a>
          </Link>
          <Link href="/new">
            <a className="page">Add Achievement</a>
          </Link>
        </div>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
