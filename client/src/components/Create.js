import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'

 
const jsonFiles = []


const Create = ({  contract , account , func }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

 

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    event.preventDefault()
    const file = event.target.files[0]
    const fullLocalPath = `D:/Projects/NFT/base_1/client/nfts/json/${name}.png`
    console.log("local path", fullLocalPath)

  
    if (typeof file !== 'undefined') {
      try {

        setImage(fullLocalPath)
        console.log("image path is set")
      } catch (error){
        console.log(" image upload error: ", error)
      }
    }
  }

  const createNFT = async () => {


    if (!image || !price || !name || !description) return
    try{
      const nftJsonFile =  JSON.stringify({image, price, name, description})
      
      jsonFiles.push(nftJsonFile)
      console.log(" created json: ")
      console.log(jsonFiles)

      const jsonLocation = `D:/Projects/NFT/base_1/client/nfts/json/${name}.json`
      console.log("file saved at",jsonLocation)

      mintThenList(jsonLocation)
    } catch(error) {
      console.log("error saving json file: ", error)
    }
    func();
    console.log("update smart contract function called")
  }
  const mintThenList = async (jsonLocation) => {

    console.log("now in mintlist")
    const uri = jsonLocation
    // mint nft 
    console.log("Account which minted the NFT is :", account)
    await contract.methods.mintToken(uri , price).send({value: "25000000000000000",from: account})
    console.log("Minted Successfully")
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create