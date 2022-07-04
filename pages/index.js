import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Banner, CreatorCard, NFTCard, SearchBar } from '../components';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import { getCreators, shortenAddress } from '../utils';

const Home = () => {
  const [hideSlideButton, setHideSlideButton] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently Added');
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      setNftsCopy(items);
    });
  }, []);

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

  const topCreators = getCreators(nfts);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    if (filteredNFTs.length) { setNfts(filteredNFTs); } else setNfts(nftsCopy);
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  useEffect(() => {
    const sortedNFTs = [...nfts];
    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNFTs.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNFTs.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNFTs.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        break;
    }
  }, [activeSelect]);

  return (
    <div className="flex justify-center">
      <div className="w-full minmd:w-4/5 my-3 px-4">
        <Banner
          name="Discover, collect, and sell extraodinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />
        <div>
          <p className="font-poppins text-nft-black-1 dark:text-nft-gray-1 font-semibold text-2xl mt-3 ml-4">Best Creators</p>
          <div className="relative flex mt-3 max-w-full" ref={parentRef}>
            <div className="flex overflow-x-scroll no-scrollbar w-max select-none" ref={scrollRef}>
              {topCreators.map((creator, i) => (
                <CreatorCard
                  key={`creator_${creator.seller}`}
                  rank={i + 1}
                  image={images[`creator${i + 1}`]}
                  name={shortenAddress(creator.seller)}
                  asset={creator.sum}
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
        <div className="flex sm:flex-col">
          <p className="font-poppins text-nft-black-1 dark:text-nft-gray-1 font-semibold text-2xl mt-3 ml-4 flex-1">Hot Bids</p>
          <div className="flex w-full justify-end mt-3 ml-4 flex-2">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
        </div>
        <div>
          <div className="flex w-full flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard
                key={nft.tokenId}
                nft={nft}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
