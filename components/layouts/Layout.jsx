import Head from 'next/head'
import Navbar from '../Navbar/navbar'

export default function layout({title, children, showLogin, setShowLogin, counter}) {
  return (
    <>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/logo.png" />
        </Head>
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} counter={counter}/>
        {children}
    </>
  )
}
