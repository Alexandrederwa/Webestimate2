import React from 'react';
import { useNavigate } from 'react-router-dom';
import MintMain from './components/MintMain';
import Description from './components/Description';
import Traits from './components/Traits';
import Team from './components/Team'
import Faq from './components/Faq'
import Footersocials from './components/Footersocials'; //Home page
//only one big container by function return here is <section> 

function Home(){
    return(
        <section className="BiggerContainer">
            <div className=" container" id='mintsection'>
                <MintMain>

                </MintMain>
            </div>
            <div className="container AllContainer" id='historysection'>
                <Description>
                </Description>
            </div>
            <div className="container AllContainer" id='traitsection'>
                <Traits>
                </Traits>
            </div>
            <div className="container AllContainer" id='teamsection'>
                <Team>
                </Team>
            </div>
            <div className="container AllContainer" id='faqsection'>
                <Faq>
                </Faq>
            </div>
            <div>
                {/* <Footersocials/> */}
            </div>
        </section>

    )

}

export default Home;