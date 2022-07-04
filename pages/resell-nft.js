import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext';
import { Loader, Button, Input } from '../components';
import { shortenAddress } from '../utils';

const ResellNFT = () => {
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createSale } = useContext(NFTContext);

  const resell = async () => {
    console.log('price', price);
    await createSale(tokenURI, price, true, tokenId);
    router.push('/');
  };

  const fetchNFT = async () => {
    console.log('tokenURI', tokenURI);
    const { data } = await axios.get(tokenURI);
    setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell NFT</h1>
        <div className="mt-6">
          <Input type="number" title="Price" placeholder="NFT Price" handleChange={(e) => setPrice(e.target.value)} />
        </div>
        {image && (
          <div className="relative w-64 h-64 sm:w-32 sm:h-32">
            <Image src={image} layout="fill" objectFit="cover" className="rounded-xl" />
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <Button btnText="List NFT" handleClick={() => { resell(); }} />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
