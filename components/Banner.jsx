import React from 'react';

const styles = {
  banner: 'nft-gradient rounded-2xl h-48 sm:h-32 relative z-10 flexCenter overflow-hidden',
  banner__text: 'text-3xl text-white md:text-2xl sm:text-xl font-poppins font-semibold p-3 leading-70 z-10',
};

const Banner = () => (
  <div className={styles.banner}>
    <p className={styles.banner__text}>Discover, collect and sell extraordinary NFTs.</p>
    <div className="bg-nft-gray-1 w-32 h-32 rounded-full absolute -top-9 -z-10 -left-6" />
    <div className="bg-nft-gray-1 w-72 h-72 rounded-full absolute -bottom-32 -right-24 -z-10" />
  </div>

);

export default Banner;
