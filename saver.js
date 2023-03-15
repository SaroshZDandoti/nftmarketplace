const fs = require('fs')
const { stringify } = require('querystring')

jsonFile = JSON.stringify('')

const name = 'nft1'

fs.writeFile(`D:/Projects/NFT/base_1/client/nfts/images/${name}.json`, jsonFile)