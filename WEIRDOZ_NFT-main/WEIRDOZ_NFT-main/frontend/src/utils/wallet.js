

export const connectWallet = async () => {
    if (window.ethereum) { //test si metamask est la
      try {
        const addressArray = await window.ethereum.request({ //demande une liste des compte
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Remplis les champs ci dessus.",
          address: addressArray[0], //prend le 1 er addresse
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message, //erreur
        };
      }
    } else { //metamask pas installé
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
export const getCurrentWalletConnected = async () => { //si on s'est déjà connecté avant
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts", //liste des comptes déjà connectés
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Remplis les champs ci dessus.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };



export const isWalletConnected = async () => {
    if (!window.ethereum) {
        return false
    }
    const accounts = await window.ethereum.request({
          method: "eth_accounts", //liste des comptes déjà connectés
        });
    return accounts?.length > 0;
}

