import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
// import market from './market.png'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react'

const Navigation = ({ web3Handler, account , func }) => {
    const [accountindex = 0, setAccountToDisplay] = useState()


    const addresses = account
    const AccountSet = (i) => {    
        setAccountToDisplay(Number(i)- 1);
        func(addresses[Number(i)- 1])
      };    


    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="">
                    {/* <img  width="40" height="40" className="" alt="" /> */}
                    &nbsp; DApp NFT Marketplace
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
                    </Nav>
                    <Nav>

                        <NavDropdown title="Select Account" id="basic-nav-dropdown" onSelect={AccountSet}>
                            <NavDropdown.Item href="#action/3.1" eventKey = "1"> Account 1 </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" eventKey = "2"> Account 2 </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3" eventKey = "3"> Account 3 </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4" eventKey = "4"> Account 4 </NavDropdown.Item>
                        </NavDropdown>
                        
                        {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${addresses[accountindex]}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {addresses[accountindex].slice(0, 5) + '...' + addresses[accountindex].slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : ( <></>
                        )}
                        <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;