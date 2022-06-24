import React, { useState, useCallback, useMemo, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

import images from '../assets';
import { Button, Input } from '../components';
import { NFTContext } from '../context/NFTContext.js';

const CreateNFT = () => {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);
  const { nftCurrency, uploadToIPFS, createNFT } = useContext(NFTContext);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 });
  const { theme } = useTheme();
  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 500000,
  });
  const fileStyle = useMemo(() => (
    `bg-white dark:bg-nft-black-1 border border-nft-gray-2 dark:border-white flex flex-col items-center p-5 border-dashed
      ${isDragActive && 'border-file-active'}
      ${isDragAccept && 'border-file-accept'}
      ${isDragReject && 'border-file-reject'}
    `
  ), []);

  const handleValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex p-12 justify-center">
      <div className="w-3/5 sm:w-full">
        <p className="font-poppins font-semibold mb-4 text-xl ">Create new NFT</p>
        <div className="flex flex-col mt-12">
          <p className="font-poppins font-semibold mb-4">Upload file</p>
          <div {...getRootProps()} className={fileStyle}>
            <input {...getInputProps()} />
            <div className="flex flexCenter flex-col">
              <p className="mb-12">JPG, PNG, GIF, SVG, WEBM Max 100MB</p>
              <Image
                src={images.upload}
                width={96}
                height={96}
                objectFit="contain"
                alt="upload image"
                className={theme === 'light' && 'filter invert'}
              />
              <p className="mt-12">Drag and Drop file</p>
              <p>or Browse media on your device</p>
            </div>
          </div>
          <div>
            {fileUrl && <img src={fileUrl} alt="UploadedFile" />}
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <Input type="text" title="Name" name="name" placeholder="NFT Name" handleChange={(e) => handleValueChange(e)} />
          <Input type="textarea" title="Description" name="description" placeholder="Description" handleChange={(e) => handleValueChange(e)} />
          <Input type="number" title="Price" name="price" placeholder={`Price in ${nftCurrency}`} handleChange={(e) => handleValueChange(e)} />
        </div>
        <div className="flex flex-row-reverse">
          <Button btnText="Create NFT" handleClick={() => createNFT(formData, fileUrl, router)} />
        </div>

      </div>

    </div>
  );
};

export default CreateNFT;
