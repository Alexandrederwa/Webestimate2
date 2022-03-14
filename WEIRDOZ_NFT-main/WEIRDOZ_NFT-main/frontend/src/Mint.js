import { useEffect, useState } from "react";
import { isWalletConnected, connectWallet, getCurrentWalletConnected} from "./utils/wallet.js";
import Minter from "./components/Minter.js";
import './css/minter.css';
//import Minter2 from "./components/Approve.js";

const MintPage = (props) => {
 
  return (
   
    <section className="MintBiggerContainer">
      <div className="MintPage container">
        <Minter/>
      </div>
    </section>
  );
};

export default MintPage;
