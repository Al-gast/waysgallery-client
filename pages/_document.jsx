import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head >
        <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@700&family=Poppins&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo.png" />
        </Head>
        <body className='bg-white'>
          <Main />
          <NextScript />
        </body> 
      </Html>
    )
  }
}

export default MyDocument