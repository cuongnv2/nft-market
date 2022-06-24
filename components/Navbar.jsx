import React, { useState, useContext } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import images from '../assets';
import Button from './Button';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/index';

const styles = {
  navbar: 'bg-white dark:bg-nft-dark w-full flex flexBetween border-b dark:border-nft-black-1 border-nft-gray-1 p-4',
  navbar__logo: 'flex items-center cursor-pointer',
  logo__name: 'ml-2 md:hidden font-semibold font-poppins',
  navbar__right: 'flex items-center',
  right__menu: 'md:hidden flex items-center',
  menu__container: 'flex md:flex-col items-center justify-center h-full z-1000',
  menu__list: 'list-none',
  menu__item: 'mx-3 font-semibold font-poppins text-base hover:text-nft-dark dark:hover:text-white md:my-2',
  item__active: 'text-nft-black-1 dark:text-white',
  item__inactive: 'text-nft-gray-2 dark:text-nft-gray-3',
  right__humberger: 'md:flex hidden ml-2',
  menu__mobile: 'fixed inset-0 top-65 flex flex-col justify-between items-center nav-h z-10 bg-overlay-black',
};

const generateLink = (i) => {
  switch (i) {
    case 0:
      return '/';
    case 1:
      return '/listed-nft';
    case 2:
      return '/my-nfts';
    default:
      return '/';
  }
};

const MenuItems = ({ activeMenu, setActiveMenu }) => (
  <div className={styles.menu__container}> {
    ['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, idx) => (
      <ul className={styles.menu__list} key={`nav_${idx}`}>
        <li
          className={`${styles.menu__item} ${activeMenu === item ? styles.item__active : styles.item__inactive}`}
          onClick={() => setActiveMenu(item)}
        >
          <Link href={generateLink(idx)}>
            {item}
          </Link>
        </li>
      </ul>
    ))
    }
  </div>
);

const ButtonGroup = ({ currentAccount, connectWallet, router }) => (
  <div>
    {currentAccount ? (
      <Button
        btnText="Create"
        customStyle="text-white"
        handleClick={() => { console.log('click...'); router.push('/create-nft'); }}
      />
    )
      : <Button btnText="Connect" customStyle="text-white" handleClick={connectWallet} />}
  </div>
);

const LeftNavbar = () => (
  <div>
    <Link href="/">
      <div className={styles.navbar__logo}>
        <Image src={images.logo02} width={32} height={32} />
        <p className={styles.logo__name}>LearnL</p>
      </div>
    </Link>
  </div>
);

const ToggleTheme = ({ theme, setTheme }) => (
  <div>
    <input type="checkbox" className="checkbox" id="changeMode" onChange={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); }} />
    <label htmlFor="changeMode" className="flexBetween w-16 h-8 p-2 relative bg-black rounded-2xl cursor-pointer">
      <i className="fas fa-sun" />
      <i className="fas fa-moon" />
      {/* <div className="w-5 h-5 absolute rounded-full bg-white ball" /> */}
    </label>
  </div>
);

const MenuList = ({ activeMenu, setActiveMenu, currentAccount, connectWallet, router }) => (
  <div className={styles.right__menu}>
    <MenuItems activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    <div className={styles.right__button} />
    <ButtonGroup currentAccount={currentAccount} connectWallet={connectWallet} router={router} />
    <span className="text-white text-sm">{currentAccount && shortenAddress(currentAccount)}</span>
  </div>
);

const MobileMenu = ({ open, setOpen, activeMenu, setActiveMenu, theme, currentAccount, connectWallet, router }) => (
  <div className={styles.right__humberger}>
    { !open && <Image src={images.menu} width={25} height={25} onClick={() => setOpen(true)} className={theme === 'light' && 'filter invert'} />}
    { open && <Image src={images.cross} width={25} height={25} onClick={() => setOpen(false)} className={theme === 'light' && 'filter invert'} />}
    { open && (
    <div className={styles.menu__mobile}>
      <div className="flex-1">
        <MenuItems activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>
      <div>
        <ButtonGroup currentAccount={currentAccount} connectWallet={connectWallet} router={router} />
      </div>
    </div>
    )}
  </div>
);

const RightNavbar = ({ open, setOpen, activeMenu, setActiveMenu, theme, setTheme, currentAccount, connectWallet, router }) => (
  <div className={styles.navbar__right}>
    <ToggleTheme theme={theme} setTheme={setTheme} />
    <MenuList activeMenu={activeMenu} setActiveMenu={setActiveMenu} currentAccount={currentAccount} connectWallet={connectWallet} router={router} />
    <MobileMenu
      open={open}
      setOpen={setOpen}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      theme={theme}
      currentAccount={currentAccount}
      connectWallet={connectWallet}
      router={router}
    />
  </div>
);

const Navbar = () => {
  const router = useRouter();
  const { currentAccount, connectWallet } = useContext(NFTContext);
  const { theme, setTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState('Explore NFTs');
  const [open, setOpen] = useState(false);
  console.log('currentAccount', currentAccount);

  return (
    <div className={styles.navbar}>
      <LeftNavbar />
      <RightNavbar
        open={open}
        setOpen={setOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        theme={theme}
        setTheme={setTheme}
        currentAccount={currentAccount}
        connectWallet={connectWallet}
        router={router}
      />
    </div>

  );
};

export default Navbar;
