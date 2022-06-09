import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import images from '../assets';
import Button from './Button';

const styles = {
  footer: 'flexCenter flex-col  border-t border-nft-gray-1 dark:border-nft-black-1',
  footer__container: 'w-full minmd:w-4/5',
  footer__main: 'flex mt-3 border-t border-nft-gray-1 dark:border-nft-black-1 p-3 md:flex-col',
  main__contact: 'flex-1 flex flex-col',
  contact__logo: 'flex items-center cursor-pointer',
  logo__name: 'ml-2 md:hidden font-semibold font-poppins',
  contact__text: 'my-3 font-poppins font-semibold',
  contact__email: 'flex items-center',
  contact__input: 'px-2 py-1 w-357 rounded-l-xl outline-none bg-nft-black-1 my-3 text-white',
  main__links: 'flex-1 flexBetweenStart ',
  link__header: 'font-poppins text-xl mb-5 font-semibold',
  link__text: 'flex flex-col',
  footer__copyright: 'flex justify-between items-center border-t border-nft-gray-1 dark:border-nft-black-1 p-3 md:flex-col md:items-center mt-3',
  copyright__text: 'text-black-1 dark:text-white font-poppins font-semibold',
  copyright__social: 'md:mt-3 flex',
  social__items: 'ml-3',
  social__item: 'cursor-pointer ml-2',
};

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__main}>
          <div className={styles.main__contact}>
            <Link href="/">
              <div className={styles.contact__logo}>
                <Image src={images.logo02} width={32} height={32} />
                <p className={styles.logo__name}>LearnL</p>
              </div>
            </Link>
            <p className={styles.contact__text}>Get the latest update.</p>
            <div className={styles.contact__email}>
              <input type="text" className={styles.contact__input} placeholder="Your email" />
              <Button btnText="Email me" customStyle="-ml-2" />
            </div>
          </div>
          <div className={styles.main__links}>
            <div>
              <h3 className={styles.link__header}>Opensea</h3>
              <div className={styles.link__text}>
                <Link href="/">How it work</Link>
                <Link href="/">Explore</Link>
                <Link href="/">Contact Us</Link>
              </div>
            </div>
            <div>
              <h3 className={styles.link__header}>Support</h3>
              <div className={styles.link__text}>
                <Link href="/">Help Center</Link>
                <Link href="/">Terms of Service</Link>
                <Link href="/">Legal</Link>
                <Link href="/">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer__copyright}>
          <div><p className={styles.copyright__text}>Opensea. All Rights Reserved.</p></div>
          <div className={styles.copyright__social}>
            {
            [images.instagram, images.telegram, images.twitter, images.discord].map((item, idx) => (
              <div className={styles.social__items}>
                <Link href="/" key={idx}>
                  <Image src={item} width={20} height={20} className={`${styles.social__item} ${theme === 'light' && 'filter invert'}`} />
                </Link>
              </div>
            ))
        }
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
