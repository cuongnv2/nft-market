import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react';

import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader } from '../components';

const ListedNFT = () => {
  const [nfts, setNfts] = useState([]);
  const { fetchMyNFTsOrListedNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMyNFTsOrListedNFT('fetchListedItem').then((items) => {
      console.log('items', items);
      setNfts(items);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }
  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter min-h-screen">
        <h1 className="font-poppins text-nft-black-1 dark:text-white text-3xl">No NFT listed.</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins text-nft-black-1 dark:text-white text-3xl ml-4">NFTs listed for sale</h2>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedNFT;
