import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { useNavigate } from 'react-router-dom'

function MintMain(){

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `mint`; 
        navigate(path);
      }

    return(

        <div className='container mintContainer'> 
            <div>
                <figure className="imgRight figure-img img-fluid col-lg-4 col-xl-5">
                    <Figure.Image
                        width={400}
                        height={400}
                        alt="weirdozMint"
                        src="img/weirdoz1.jpeg"
                    />
                </figure>
            </div>
            <div>
                <h1 className="display-5 col-lg-8 col-xl-7 imgText">Welcome to Weirdo Land, a place where everyone is welcome and accepted. 
                </h1>
                <p className="lead col-md-12">
                MINT COMING SOON</p>
                <button onClick={routeChange} type ="button" className="buttonImage col-4">
                    <span>Mint now ! </span>
                </button>
            </div>
        </div>
        

    )
}


export default MintMain;