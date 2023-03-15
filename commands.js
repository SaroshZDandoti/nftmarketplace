 

const instance = await NftMarket.deployed();

instance.mintToken("D:\\Projects\\nftmarketplace\\test\\nftMeta\\json\\creature-1.json","300000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.mintToken("D:\\Projects\\nftmarketplace\\test\\nftMeta\\json\\creature-2.json","700000000000000000", {value: "25000000000000000",from: accounts[0]})
instance.mintToken("D:\\Projects\\nftmarketplace\\test\\nftMeta\\images\\creature_4.png","600000000000000000", {value: "25000000000000000",from: accounts[1]})

instance.mintToken("D:\\Projects\\nftmarketplace\\images\\1.png","500000000000000000", {value: "25000000000000000",from: accounts[0]})

instance.getAllNftsOnSale()

instance.getNftItem(1)

instance.getOwnedNfts()

instance.buyNft(1)