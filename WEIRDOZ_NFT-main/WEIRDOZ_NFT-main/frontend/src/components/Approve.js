import React, { Component, useState,useEffect } from 'react'
import { Button, Progress, Loader } from 'semantic-ui-react';
import { ethers } from 'ethers'
import abi from '../contract-abi.json';
import Figure from 'react-bootstrap/Figure';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from 'react-bootstrap';

const address = "0x66f9220dCC85343140F31C70cd0a58421569AE10";
const contract = "0xE31a1A40D1FCd3889Fb2d73Fd81B64E17237D705";
const state = "regular" ;

const Minter2 = (props) => {

    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const [account, setAccount] = useState([]);
    const [cost, setCost] = useState(null);
    const [whitelistCost, setWhitelistCost] = useState(null);
    const [minted, setMinted] = useState(null);
    const [supply, setSupply] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mintType, setMintType] = useState(state);
    const [count, setCount] = useState(1);
    const [maxPerWallet, setMaxPerWallet] = useState(null);
    const [maxMintPossible,setMaxMintPossible] = useState(5);

    const optionsToast = {
        autoClose: 8000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
    };

    

    const getAccounts = async () => {
    
        if (typeof window.ethereum !== 'undefined') {
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            setAccount({ account: accounts });
            console.log(account)
            if (contract !== null) {
                const balanceOf = await contract.balanceOf(account[0], 1)
                if (balanceOf > 0) {
                    //setError({ error: "You have reached the Max Per Wallet limit." })
                    toast.error("You have reached the Max Per Wallet limit.", optionsToast);
                }
                console.log(parseInt(String(balanceOf)));
            }
        }
        else {
            
            //setError({ error: "You need to connect with metamask" })
            toast.error("You need to connect with metamask", optionsToast);
        }
    }

    
    const fetchData = async () => {
        
        if (typeof window.ethereum !== "undefined") {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            const { chainId } = await provider.getNetwork()
            // Not on Ethereum network, set an error
            if (chainId !== 1 && chainId !== 4 && chainId !== 45000 && chainId !== 5) {
                console.log("Metamask is not connected to Ethereum network")
                setLoading({ loading: false, error: `Wrong Chain ID: ${chainId}, please switch to Ethereum network mainnet` })
            }
            else {
                const contract = new ethers.Contract(address, abi, provider);
                try {
                    const cost = await contract.PRICE();
                    const whitelistCost = await contract.WHITELIST_PRICE();
                    const supply = 10
                    //const supply = await contract.MAX_SUPPLY()
                    const minted = await contract.totalSupply()
                    const maxWallet = await contract.MAX_PER_USER()
                    setWhitelistCost(whitelistCost)
                    setContract(contract)
                    setLoading(false)
                    setCost(String(cost))
                    setSupply(String(supply))
                    setMinted(String(minted))
                    setMaxPerWallet(String(maxWallet))
                    
                    getAccounts();
                }
                catch (err) {
                    setLoading({ loading: false, error: err.message});
                    console.log('error - contract not valid')
                }
            }

        }
        else {
            setLoading({ loading: false, error: "Web3 is not supported by your browser or Metamask is not installed" });
        }
    }

    
    const mint = async () => {
        console.log("minting")
        if (typeof window.ethereum !== 'undefined') {
            let abiDeposit = [    
                "function deposit(uint8 destinationChainID, bytes32 resourceID, bytes calldata data) external payable whenNotPaused " 
              ]
            
            let abiApprove = [
                "function approve(address to, uint256 tokenId) public override"
            ]
            
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts)
            const provider = new ethers.providers.JsonRpcProvider("https://london.mcnpoc.xyz:9650/ext/bc/JUNE/rpc");
            const signer = provider.getSigner(accounts[0]);
            
            const contractApprove = new ethers.Contract("0x66f9220dCC85343140F31C70cd0a58421569AE10", abiApprove, signer);
            const contract = new ethers.Contract("0x7EC99C43b6fFC7dfAEe298929aAC498996e03D33", abiDeposit, signer);
            
            let ressourceId = "0x66f9220dCC85343140F31C70cd0a58421569AE10" + "3" ;
            ressourceId ="0x"+ ressourceId.slice(2,45).padStart(64,"0")
            console.log(ressourceId)
            try {                
                if (mintType === 'regular'){
                    let overrides = {
                        from: accounts[0],
                        value: String(0)
                    }
                    console.log('test')
                    const approve = await contractApprove.approve("0x5643B07065B77425Caf86B5FED24c60C41cb34E6",0,overrides);
                    await approve.wait()
                    //0x000000000000000000000066f9220dCC85343140F31C70cd0a58421569AE1000
                    // const transaction = await contract.deposit(3,ressourceId, ["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000000000000000000000000020","0x000000000000000000000000347aC2487645D29E4033E86ae9D72F26e067EF80" ],overrides);
                    // await transaction.wait()0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020347aC2487645D29E4033E86ae9D72F26e067EF80
                    console.log('es')
                    toast.success("Successfull approve", optionsToast);
                    fetchData();
                }
            }
            catch (err) {
                //setError({ error: "a" });
                console.log(err.message)
                try{
                    toast.error(err.message.split(",")[1].split(":")[2], optionsToast);
                    
                }
                catch{
                    toast.error(err.message, optionsToast);
                }
            }
        }
    }

    useEffect(async () => { //quand on démare la 1 er fois
         fetchData();
         if (typeof window.ethereum !== 'undefined') {
             window.ethereum.on('accountsChanged', async function (accounts) {
                 // Time to reload your interface with accounts[0]!
                 console.log("Account changed:", accounts[0])
                 document.location.reload();
 
             })
 
             window.ethereum.on('chainChanged', async function (chain) {
                 // Time to reload your interface with accounts[0]!
                 console.log("Network changed:", chain)
                 document.location.reload();
 
             })
         }
         else {
             console.log("aa")
             toast.error("Web3 is not supported by your browser or Metamask is not installed", optionsToast);
             setLoading({ loading: false });
         }
      }, []);



    
    return (

        <div>
            <figure className="gifRight figure-img img-fluid ">
                    <Figure.Image
                        className='coverMintPage'
                        
                        alt="2000.2000"
                        src="img/gifdescription.gif"
                    />
                </figure>
            
            <div className="content">
                {loading &&
                    <div>
                        <Loader active inline />
                        <div>
                            <font color="red">Web3 is not supported by your browser or Metamask is not installed</font> <br />
                        </div>
                    </div>
                }
                
                {!loading  &&
                    <div>
                        <h1>Mint your WEIRDOZ</h1>
                        <p> 1 WEIRDOZ  = {cost / 10 ** 18} ETH | Max: {maxPerWallet}  WEIRDOZ per wallet</p>
                    
                        <ProgressBar variant="success" animated now={minted / supply * 100}/>

                        <p> {(minted / supply * 100).toFixed(2)}% of current available supply has been minted.</p>
                        <RangeSlider
                            value={count}
                            step={1}
                            min={1}
                            max={maxMintPossible}
                            onChange={changeEvent => setCount(changeEvent.target.value)}
                        />

                        {account.length !== 0 &&
                            <div>
                                
                                <Button onClick={mint.bind(this)} size="big" color="blue">Mint {count} WEIRDOZ</Button>
                            </div>
                        }
                        
                        {account.length === 0 &&
                            <Button onClick={getAccounts.bind(this)} size="big" color="blue">Connect with metamask</Button>
                        }
                    </div>
                }

                
               

                
                

            </div>
            
            
            <ToastContainer style={{ fontSize: "0.6rem" }} />

            
        </div>
    );

}

export default Minter2
