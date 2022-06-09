import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ThemeProvider, useTheme } from 'next-themes';

import { Banner, CreatorCard, NFTCard } from '../components';
import images from '../assets';

const Home = () => {
  const [hideSlideButton, setHideSlideButton] = useState(false);
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    if (current?.scrollWidth > parent?.offsetWidth) { setHideSlideButton(false); } else { setHideSlideButton(true); }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => window.removeEventListener('resize', isScrollable);
  });

  return (
    <div className="flex justify-center">
      <div className="w-full minmd:w-4/5 my-3 px-4">
        <Banner />
        <div>
          <p className="font-poppins text-nft-black-1 dark:text-nft-gray-1 font-semibold text-2xl mt-3 ml-4">Best Creators</p>
          <div className="relative flex mt-3 max-w-full" ref={parentRef}>
            <div className="flex overflow-x-scroll no-scrollbar w-max select-none" ref={scrollRef}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator_${i}`}
                  rank={i}
                  image={images[`creator${i}`]}
                />
              ))}
              { !hideSlideButton && (
              <>
                <div className="absolute top-45 left-0 cursor-pointer" onClick={() => handleScroll('left')}>
                  <Image src={images.left} width={24} height={24} objectFit="contain" alt="leftArrow" className={`${theme === 'light' && 'filter invert'}`} />
                </div>
                <div className="absolute top-45 -right-3 cursor-pointer" onClick={() => handleScroll('right')}>
                  <Image src={images.right} width={24} height={24} objectFit="contain" alt="rightArrow" className={`${theme === 'light' && 'filter invert'}`} />
                </div>
              </>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="font-poppins text-nft-black-1 dark:text-nft-gray-1 font-semibold text-2xl mt-3 ml-4">Hot Bids</p>
          <div>Search bar</div>
          <div className="flex w-full flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft_${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: 10 - 0.5 * i,
                  seller: '099...abcd',
                  owner: '088...mxyz',
                }}

              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
