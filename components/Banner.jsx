import React from 'react';

const styles = {
  banner: 'relative w-full flex items-center z-0 overflow-hidden nft-gradient',
  banner__text: 'font-bold text-5xl font-poppins leading-70',
};

const Banner = ({ name, childStyles, parentStyles }) => (
  <div className={`${styles.banner} ${parentStyles}`}>
    <p className={`${styles.banner__text} ${childStyles}`}>{name}</p>
    <div className="bg-nft-gray-1 w-32 h-32 rounded-full absolute -top-9 -z-10 -left-6" />
    <div className="bg-nft-gray-1 w-72 h-72 rounded-full absolute -bottom-32 -right-24 -z-10" />
  </div>

);

export default Banner;
