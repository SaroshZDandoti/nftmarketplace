import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'



const Home = ({ contract }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  
  async function loadMarketplaceItems() {
    console.log("MY CONTRACT", contract)
    // Load all unsold items
    const listedNfts = await contract.methods.listedItemsCount()
    console.log("listed NFTS", Number(listedNfts))
    let items = []

    for (let i = 1; i <= listedNfts; i++) {
      console.log(" i am in loop")
      const itemNFT = await contract.methods.getNftItem(i)
      if (itemNFT.isListed) {

        // get uri url from nft contract
        const uri = await contract.methods.tokenURI(itemNFT.tokenId)

        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)

        const metadata = await response.json()

        // get total price of item (item price + fee)
        const totalPrice = await contract.methods.getNftItem(itemNFT.price)

        // Add item to items array
        items.push({
          totalPrice,
          itemId: items.tokenId,
          seller: items.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
  //   items = [
  //     {"tokenId": 0,
  //       "image":"D:/Projects/NFT/base_1/client/nfts/json/Creature_1.png",
  //       "price":"1",
  //       "name":"nft1",
  //       "description":"one"
  //   },
  //   {"tokenId": 1,
  //     "image":"D:/Projects/NFT/base_1/client/nfts/json/Creature_2.png",
  //     "price":"2",
  //     "name":"nft2",
  //     "description":"two"
  // },
  // {"tokenId": 2,
  //   "image":"D:/Projects/NFT/base_1/client/nfts/json/Creature_3.png",
  //   "price":"5",
  //   "name":"nft3",
  //   "description":"three"
  // }
  //   ]

    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await contract.buyNft( item.tokenId, { value: item.price })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => { 
    // console.log(" useEffect called")
    loadMarketplaceItems()
  }, [])

  if (loading) return (
    
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )

  
  return (
    <div className="flex justify-center">

      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.price)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );

}
export default Home