export const shortenAddress = (address) => (`${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`);

export const getCreators = (nfts) => {
  const creators = nfts.reduce((creatorObject, nft) => {
    (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
    return creatorObject;
  }, {});

  console.log('creatorObject', creators);

  return Object.entries(creators).map((creator) => {
    const seller = creator[0];
    const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);

    return ({ seller, sum });
  });
};
