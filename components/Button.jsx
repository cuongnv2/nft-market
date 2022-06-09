import React from 'react';

const Button = ({ customStyle, btnText }) => (
  <button
    type="button"
    className={`${customStyle} nft-gradient rounded-xl px-5 py-1 bg-gradient-to-r from-pink-500 font-semibold font-poppins`}
  >{btnText}
  </button>
);

export default Button;
