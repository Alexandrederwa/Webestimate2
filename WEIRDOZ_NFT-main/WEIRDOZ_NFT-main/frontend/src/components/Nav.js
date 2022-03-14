//navbar 
import React from 'react'; // ES6 js
import {Image} from 'react-native';
import {Link} from 'react-router-dom'; //link function in react for url link xxx/link
import "../css/navbar.css"

function Nav() {
    return(
        <div className='container'>
        
            <nav class="navbar navbar-expand-lg fixed-top navBarCss container ">
                <div class="container-fluid">
                    <Link to='/' className="navbar-brand Navbar-picture-logo">
                        <img alt="Weirdoz" className="fuild Navbar-picture-logo" src="/img/logoWRDZ.png" href='#mintsection'/>
                    </Link>
                    <button class="navbar-toggler btnNavbar" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {/* <span class="navbar-toggler-icon"></span> */}
                        <i class="bi bi-list btnNavbar"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/#historysection">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#traitsection">Traits</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#">Roadmap</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#teamsection">Team</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/#faqsection">FAQ</a>
                            </li>
                        </ul>
                        <div  id="navSocialsLogo nav-item">
                            <div class="d-flex  nav-link">
                                {/* <Link to="https://opensea.io/collection/the-moon-boyz">
                                    <img alt="Opensea page" className="Navbar-socials" src="/img/opensea.png" />
                                </Link> */}
                                <Link to="https://www.instagram.com/">
                                    <img alt="instagram page" className="Navbar-socials" src="/img/instaLogo.png" />
                                </Link>
                                <Link to="https://discord.com/">
                                    <img alt="Discord page" className="Navbar-socials" src="/img/discordLogo.png" />
                                </Link>
                                <Link to="https://www.twitter.com/">
                                    <img alt="twitter page" className="Navbar-socials" src="/img/twitterLogo.png" />
                                </Link>
                                {/* <Link to="https://etherscan.io/">
                                    <img alt="ethscan page" className="Navbar-socials" src="/img/etherscan.png" />
                                </Link> */}
                            </div>
                        </div>
                        </div>
                </div>
            </nav>
        </div>

    );
}

export default Nav;