import Script from 'next/script';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';
import { Navbar, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';

const MyApp = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-white dark:bg-nft-dark">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>

      <Script src="https://kit.fontawesome.com/937c82906b.js" crossorigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>

);

export default MyApp;
