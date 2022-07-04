import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';

import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Banner, SearchBar } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils';

const MyNFT = () => {
  const { fetchMyNFTsOrListedNFT, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMyNFTsOrListedNFT().then((items) => {
      console.log('items', items);
      setNfts(items);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="My NFT"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 bg-nft-black-2 rounded-full p-1">
            <Image src={images.creator1} objectFit="cover" className="rounded-full" />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 mt-2 font-semibold">{shortenAddress(currentAccount)}</p>
        </div>
      </div>
      {!isLoading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-3xl">No NFT Owned!!</h1>
        </div>
      ) : (
        <div className="p-12 sm:p-4 w-full minmd:w-4/5 flex-col">
          <div className="flex-1 w-full sm:flex-col px-4 flex"><SearchBar /></div>
          <div className="mt-3 flex flex-wrap">{nfts.map((nft) => (<NFTCard key={nft.token} nft={nft} showOwner />))}</div>
        </div>
      )}
    </div>
  );
};
export default MyNFT;
