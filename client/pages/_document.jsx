import Document, {Html, Main, Head, NextScript} from "next/document";

class LDocument extends Document {
    render() {
        return (
            <Html>
        <Head>
                <script src="/gtag.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
        )
    }
}

export default LDocument;