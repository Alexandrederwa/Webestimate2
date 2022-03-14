import React, { useState,useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Loader } from 'semantic-ui-react';
import { ethers } from 'ethers'
import abi from '../contract-abi.json';
import Figure from 'react-bootstrap/Figure';
import NumericInput from 'react-numeric-input';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const address = "0x8B44b93f9dAFB9Cb7DEcEEe522E018279D8D56eb";

const Minter = (props) => {

    const [contract, setContract] = useState(null);
    const [networkError, setNetworkError] = useState(null);
    const [account, setAccount] = useState([]);
    const [availableAccount, setAvailableAccount] = useState(false);
    const [cost, setCost] = useState(null);
    const [whitelistCost, setWhitelistCost] = useState(null);
    const [minted, setMinted] = useState(null);
    const [supply, setSupply] = useState(null);
    const [loading, setLoading] = useState(null);
    const [count, setCount] = useState(1);
    const [maxPerWallet, setMaxPerWallet] = useState(null);

    //Change for public sale 
    const [mintType, setMintType] = useState('regular');
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
    
    //Check if account already connected
    const isWalletConnected = async () => {
        if (!window.ethereum) {
            return false
        }
        const accounts = await window.ethereum.request({
              method: "eth_accounts", 
            });
        if( accounts?.length > 0){
            setAvailableAccount({ availableAccount: true })
        }
    }

    //connect account to website
    const getAccounts = async () => {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts.length)

        if(accounts.length >0 ){
            setAvailableAccount({ availableAccount: true })
            setAccount({ account: accounts });
            
            return false
        }
        else{
            toast.error("You need to connect with metamask", optionsToast);
            setLoading({loading: false})
            console.log("yeah")
        }      
    }
    
    const fetchData = async () => {
        if (typeof window.ethereum !== "undefined") {
                      
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider)
            const { chainId } = await provider.getNetwork()
            // Not on Ethereum network, set an error
            if ( chainId !== 5) {
                
                setNetworkError({ networkError: true});
                toast.error(`Wrong Chain ID: ${chainId}, please switch to Ethereum network mainnet`, optionsToast);
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
                    setCost(String(cost))
                    setSupply(String(supply))
                    setMinted(String(minted))
                    setMaxPerWallet(String(maxWallet))
                    
                }

                catch (err) {
                    setLoading({ loading: false});
                    console.log(loading)
                    toast.error(err.message, optionsToast);
                    console.log('error')
                }
            }

        }
        else {
            setLoading({ loading: false});
            console.log(loading)
        }
    }

    
    const mint = async () => {
        console.log("minting")
        if (typeof window.ethereum !== 'undefined') {
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);
            if(accounts.length >0 ){
                console.log("account>0")
                try {                
                    if (mintType === 'regular'){
			console.log(window.ethereum.selectedAddress)
                        const data = await fetch(`/api/mint/${window.ethereum.selectedAddress}`, {
                            method: 'GET'
                        }); 
			console.log(data)   
                        const proof = await data.json();
                        console.log(proof)
                        console.log('regular')
                        console.log("cost", cost)
                        let overrides = {
                            from: accounts[0],
                            value: String(cost*count)
                        }
                        const transaction = await contract.mintNFTs(proof,count,overrides);
                        await transaction.wait()
                        toast.success("Successfull Mint", optionsToast);
                        fetchData();
                    }
                    else{
                        const data = await fetch(`/api/mint/${window.ethereum.selectedAddress}`, {
                            method: 'GET'
                        });    
                        const proof = await data.json();
                        console.log(proof)
                        console.log("WHcost", whitelistCost)
                        console.log("cost", cost)
                        console.log('whitelist')
                        let overrides = {
                            from: accounts[0],
                            value: String(whitelistCost*count)
                        }
                        const transaction = await contract.whitelistMintNFTs(proof,count,overrides);
                        await transaction.wait()
                        toast.success("Successfull Mint", optionsToast);
                        fetchData();
                    }
                }
                catch (err) {
                    try{
                        toast.error(err.message.split(",")[1].split(":")[2].split('"')[0], optionsToast);
                        console.log(err.message)
                    }
                    catch{
                        if (err.message == "Unexpected token T in JSON at position 0") {
                            toast.error("Too many requests. Please wait 15 minutes", optionsToast);
                        }
                        else{
                            toast.error(err.message, optionsToast);
                            console.log(err.message)
                        }
                        
                    }
                }
            }
            else{
                toast.error("You need to connect with metamask", optionsToast);
                setLoading({loading: false});
            }
        }
    }

    useEffect(async () => { //quand on démare la 1 er fois
         fetchData();
         console.log(isWalletConnected())
         if (typeof window.ethereum !== 'undefined') {             
             window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    toast.success("Successfull Connected!", optionsToast);
                  
                } else {
                    toast.error("🦊 Connect to Metamask using the button.", optionsToast);
                }
            })
             window.ethereum.on('chainChanged', async function (chain) {
                 // Time to reload your interface with accounts[0]!
                 console.log("Network changed:", chain)
                 document.location.reload(); 
             })
         }
         else {
             toast.error("Web3 is not supported by your browser or Metamask is not installed", optionsToast);
             setLoading({ loading: false });
         }
      }, []);



    return (

        <div className='minter'>
            <figure class="gifImg figure-img img-fluid ">
                    <Figure.Image
                        className='coverMintPage'
                        
                        alt="gif weirdoz animated"
                        src="img/gifdescription.gif"
                    />
                </figure>
            
            <div className="content">
                
                {networkError && 
                    <div className='paragraphe'>
                        <Loader active inline />
                        <div>
                            <font color="red">Wrong Chain ID , please switch to Ethereum network mainnet</font> <br />
                        </div>
                    </div>
                }
                
                {!networkError && !loading &&
                    <div className='paragraphe'>
                        <h1 className='title'>Mint your WEIRDOZ</h1>

                        {/* <ProgressBar variant="success" animated now={minted / supply * 100}/>

                        <p> {(minted / supply * 100).toFixed(2)}% of current available supply has been minted.</p>
                         */}
                        
                        <div className='numberChoice'> 
                            <label htmlFor="setCount" className="form-label" >Choose a number between 1 and 5</label>
                            <NumericInput value={count} id="setCount" className="form-control mb-1" min={0} max={5} onChange={(value) => setCount(value)} />
                        </div>
                        {availableAccount &&                  
                            <Button onClick={mint.bind(this)} size="big" color="blue" className='btn btn-primary MintButton'>Mint {count} WEIRDOZ</Button>
                        }
                        {!availableAccount &&
                            <Button onClick={() =>getAccounts()} size="big" color="blue" className='btn btn-primary btn-lg MintButton'>Connect with metamask</Button>
                        }   
                                                
                    </div>
                }
                {loading &&
                    <p className="paragraphe">
                        
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`} >
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                        </a>
                    </p>
                        }
            </div>
            
            
            <ToastContainer style={{ fontSize: "1.5rem" }} />

            
        </div>
    );

}

export default Minter
