import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/index';

const NFTCard = ({ nft }) => {
  console.log('nft', nft);
  const { nftCurrency } = useContext(NFTContext);
  return (
    <Link href={{ pathname: '/nft-details', query: nft }}>
      <div className="flex-1 min-w-215 max-w-max x:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256
        minlg:min-w-327 dark:bg-nft-black-3 p-4 m-4 rounded-2xl minlg:m-8 sm:my-2 cursor-pointer shadow-md"
      >
        <div className="relative w-full h-52 sm:h-36 xs:h-36 mind:h-60 minlg:h-300 overflow-hidden rounded-2xl">
          <Image src={nft.image} alt="NFT" layout="fill" objectFit="cover" />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins font-semibold">{nft.name}</p>
          <div className="flexBetween mt-2 text-sm font-poppins font-semibold">
            <div>{nft.price} {nftCurrency}</div>
            <div>{shortenAddress(nft.owner)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
