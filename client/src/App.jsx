import { EthProvider } from "./contexts/EthContext";
import { useState } from 'react'
import { ethers } from "ethers"
import Navigation from './components/Navbar';
import Home from './components/Home.js'
import Create from './components/Create.js'
import MyListedItems from './components/MyListedItems.js'
import MyPurchases from './components/MyPurchases.js'


import Web3 from "web3";


import configurations from "./contracts/NftMarket.json"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./styles.css";

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
web3.setProvider('ws://localhost:7545');

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})
  const [currAccount , setCurrAcc] = useState({})

  const getCurrentAccountFromNav = (data) => {
    console.log("The account received from NavbarJS: ",data); 
    setCurrAcc(data)
  }


  function loadContract(){
    const CONTRACT_ADDRESS = configurations.networks['5777'].address;
    const CONTRACT_ABI = configurations.abi;
    
    const contractweb3 =  new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS,  {gasLimit: 3000000});
   return contractweb3;
  }
  
  const contractweb3 = loadContract()
  
  const web3Handler = async () => {    
    web3.eth.getAccounts().then(
      function(accounts){
          setAccount(accounts)
      } );    
    loadContracts()
  }

  const loadContracts = async () => {
    setContract(contractweb3) 
  
    setLoading(false)
  }

  return (
    <BrowserRouter>
    <div className="App">
    <>
    <Navigation web3Handler={web3Handler} account={account} func={getCurrentAccountFromNav}  />
    </>
    <Routes>
            <Route path="/" element={
              <Home contract={contractweb3} />
            } />
            <Route path="/create" element={
              <Create contract = {contractweb3} account = {currAccount}  func = {loadContract}/>
            } />
            <Route path="/my-listed-items" element={
              <MyListedItems  />
            } />
            <Route path="/my-purchases" element={
              <MyPurchases  />
            } />
          </Routes>
    </div> 
    </BrowserRouter>
  );
}

export default App;
