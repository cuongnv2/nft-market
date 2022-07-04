import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }) => {
  console.log('');
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) { handleSearch(search); } else clearSearch();
  }, [search]);

  return (
    <>
      <div className="flex flex-1 flexCenter dark:bg-nft-black-2 bg-white dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md py-3">
        <Image src={images.search} objectFit="contain" width={20} height={20} className={theme === 'light' && 'filter invert'} />
        <input
          type="text"
          placeholder="Search NFT here"
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={(e) => { setDebouncedSearch(e.target.value); }}
          value={debouncedSearch}
        />
      </div>
      <div onClick={() => { setToggle((prev) => !prev); }} className="relative flexBetween ml-4 sm:ml-0 min-w-190 cursor-pointer  dark:bg-nft-black-2 bg-white dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md">
        <p className="font-poppins dark:text-white text-nft-black-1 text-xs">{activeSelect}</p>
        <Image src={images.arrow} objectFit="contain" width={15} height={15} className={theme === 'light' && 'filter invert'} />
        {toggle && (
        <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white dark:border-nft-black-2 border-nft-gray-2 rounded-md py-3 px-4">
            {['Recently added', 'Price (low to high)', 'Price (high to low)'].map((item) => (
              <p
                key={item}
                onClick={() => setActiveSelect(item)}
                className="font-poppins dark:text-white text-nft-black-1 text-xs my-3 cursor-pointer"
              >{item}
              </p>
            ))}
        </div>
        )}
      </div>

    </>
  );
};

export default SearchBar;
