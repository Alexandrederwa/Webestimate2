import React from 'react';
function Faq(){

    return(
        <section>
            <div className="container">
                <div className="accordion" id="accordionExample">
                    <div className="item">
                        <div className="item-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <img className="buttonFaq"  src="./img/logotempo.png"></img>
                                    Collapsible Item #1
                                </button>
                            </h2>
                         </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="t-p">
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Faq;