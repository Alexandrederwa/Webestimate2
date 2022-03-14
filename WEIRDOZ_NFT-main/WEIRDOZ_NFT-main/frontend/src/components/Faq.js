import React from 'react';
function Faq(){

    return(
        <section>
            <div className="center">
                FAQ
            </div>
            <div className="content">
                <div>
                    <input type="checkbox" id="question1" name="q"  className="questions"/>
                    <div className="plus">
                        <img className="buttonFaq" src="./img/logoWRDZ.png" alt="Generic placeholder image"></img>
                    </div>
                        <label for="question1" className="question">
                            This is the question that will be asked?
                        </label>
                        <div className="answers">
                            This is the answer of the question.. keep it short.
                        </div>
                </div>
            </div>
            <div className="content">
                <div>

                    <input type="checkbox" id="question1" name="q"  className="questions"/>
                    <div className="plus">
                        <img className="buttonFaq" src="./img/logoWRDZ.png" alt="Generic placeholder image"></img>
                    </div>
                        <label for="question1" className="question">
                            This is the question that will be asked?
                        </label>
                        <div className="answers">
                            This is the answer of the question.. keep it short.
                        </div>
                </div>
            </div>
        </section>
    )

}

export default Faq;