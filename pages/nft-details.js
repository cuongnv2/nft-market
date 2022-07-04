import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Button, Modal } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils';

const PaymentBody = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold minlg:text-xl">Item</p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold minlg:text-xl">Subtotal</p>
    </div>
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image src={nft.image} layout="fill" objectFit="cover" />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">{shortenAddress(nft.seller)}</p>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">{nft.name}</p>
        </div>
      </div>
      <div>
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm">{nft.price} &nbsp; {nftCurrency}</p>
      </div>
    </div>
    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm">Total</p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm">{nft.price} &nbsp; {nftCurrency}</p>
    </div>
  </div>
);

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [nft, setNFT] = useState({ image: '', tokenId: '', name: '', owner: '', price: '', seller: '' });
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setNFT(router.query);
    setIsLoading(false);
  }, [router.isReady]);

  if (isLoading) {
    return (
      <div className="flexStart">
        <Loader />
      </div>
    );
  }

  const checkout = async () => {
    await buyNFT(nft);
    setOpenModal(false);
    setSuccess(true);
  };

  console.log('nft.owner.toLowerCase()', nft.owner.toLowerCase());
  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12
        border-r md:border-r-0 md:border-b border-nft-gray-1 dark:border-nft-black-1"
      >
        <div className="relative w-557 sm:w-full sm:h-300 h-557">
          {nft.image && <Image src={nft.image} alt="NFT detail" className="rounded-xl shadow-lg" layout="fill" />}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-col">
          <h2 className="font-poppins dark:text-white text-nft-dark-1 font-semibold text-2xl">{nft.name}</h2>
          <div className="mt-10">
            <p className="font-poppins dark:text-white text-nft-dark-1 font-semibold text-xs">Creator</p>
            <div className="flex items-center mt-3">
              <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                <Image src={images.creator1} objectFit="cover" className="rounded-full" />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 mt-2 font-semibold">{shortenAddress(nft.seller)}</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col">
            <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex-1">
              <p className="font-poppins dark:text-white text-nft-black-1 mt-2 font-medium text-base">Detail</p>
            </div>
            <div className="mt-3">
              <p className="font-poppins dark:text-white text-nft-black-1 mt-2 font-medium ">{nft.description}</p>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-poppins border-gray p-2 dark:text-white text-nft-black-1 mt-2 font-medium ">
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button btnText="List on Market Place" handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)} />
          ) : (
            <Button btnText={`Buy for ${nft.price} ${nftCurrency}`} handleClick={() => setOpenModal(true)} />
          )}
        </div>
      </div>
      {openModal && (
        <Modal
          header="Check Out"
          body={<PaymentBody nft={nft} nftCurrency={nftCurrency} />}
          footer={(
            <div className="flex sm:flex-col">
              <Button btnText="Checkout" handleClick={() => { checkout(); }} customStyle="mr-5 sm:mr-0" />
              <Button btnText="Cancel" handleClick={() => { setOpenModal(false); }} customStyle="sm:mt-5" />
            </div>
        )}
          handleClose={() => { setOpenModal(false); }}
        />
      )}
      {success && (
        <Modal
          header="Payment successfully!"
          body={(
            <div className="flexCenter">
              <div className="relative w-52 h-52 rounded-lg">
                <Image src={nft.image} objectFit="cover" layout="fill" className="rounded-lg" />
              </div>
            </div>
          )}
          footer={(
            <div className="flexCenter">
              <Button btnText="Check it out" handleClick={() => { setSuccess(false); router.push('/my-nfts'); }} />
            </div>
        )}
          handleClose={() => { setSuccess(false); }}
        />
      )}

    </div>
  );
};

export default NFTDetails;
