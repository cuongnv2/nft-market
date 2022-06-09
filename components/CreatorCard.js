import React from 'react';
import Image from 'next/image';

import images from '../assets';

const CreatorCard = ({ rank, image }) => (
  <div
    className="flex flex-col min-w-190 minlg:min-w-240 bg-white dark:bg-nft-black-3
  border-nft-gray-1 dark:border-nft-black-3 p-4 m-4 rounded-3xl border"

  >
    <div className="w-8 h-8 rounded-full bg-nft-red-violet flexCenter">
      <p className="font-semibold font-poppins">{rank}</p>
    </div>
    <div className="flex justify-center">
      <div className="relative w-20 h-20">
        <Image src={image} layout="fill" alt="creator" className="rounded-full" />
        <div className="absolute bottom-0 right-0">
          <Image
            src={images.tick}
            height={15}
            width={15}
            alt="tick"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
    <div className="flex items-center flex-col mt-3">
      <p className="font-poppins font-semibold">0x6o2...u8yg</p>
      <span className="font-poppins font-semibold inline">{10 - rank * 0.5} ETH</span>
    </div>
  </div>
);

export default CreatorCard;