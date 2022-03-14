import React from 'react';
import Figure from 'react-bootstrap/Figure';
function Description(){

    return(
        <section>
            <div class='container aboutContainer'>
                <div className='row'>
                    <div className='col-md-6'>
                        <figure class="gifLeft figure-img img-fluid ">
                            <Figure.Image
                                width={500}
                                height={500}
                                alt="2000.2000"
                                src="img/gifdescription.gif"
                            />
                        </figure>
                    </div>
                    <div class="col-md-4 aboutText ">
                        <h3 className=" display-7"> Who are the Weirdoz? </h3>
                        <p className='lead'>The Weirdoz are 5,050 randomly generated weird frens that were created thousands of years after humanity' went extinct. 
                        Their creation was based upon the memories left in the cloud by humans. One of the biggest characteristics of Weirdoz is that they are kind to each other.
                         They accept each other as they are without any kind of judgement.  </p> 
                        <p className="lead font-weight-bold">Their goal is to : MAGA - Make Art Great Again. They plan to do this by empowering the creation and propagation of art across the world in all its forms. </p>
                    </div>

                </div>
            </div>
        </section>
    )

}

export default Description;