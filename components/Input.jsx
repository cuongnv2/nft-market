import React, { useContext } from 'react';

import { NFTContext } from '../context/NFTContext.js';

const RenderInput = ({ props }) => {
  const { type, handleChange } = props;
  const { nftCurrency } = useContext(NFTContext);
  switch (type) {
    case 'number':
      return (
        <div className="relative flex items-center">
          <input {...props} className="border flex-1 border-nft-gray-2 p-2 outline-none dark:border-none" onChange={handleChange} />
          <p className="absolute md:right-6 right-10">{nftCurrency}</p>
        </div>
      );
    case 'textarea':
      return <textarea rows={10} {...props} className="border border-nft-gray-2 p-2 outline-none dark:border-none" onChange={handleChange} />;
    default:
      return <input {...props} className="border border-nft-gray-2 p-2 outline-none dark:border-none" onChange={handleChange} />;
  }
};

const Input = (props) => {
  const { title } = props;

  return (
    <div className="mb-4 flex flex-col">
      <p className="font-poppins font-semibold mb-4">{title}</p>
      <RenderInput props={props} />
    </div>
  );
};

export default Input;
