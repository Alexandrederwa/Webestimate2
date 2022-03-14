import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { Grid , Typography} from '@mui/material/';
function Team(){

    return(
        <section>
                        <div class="container py-5 bg-light">
                <h2 class="display-4 text-center mb-5">Marketing</h2>
                <div class="row">

                    <div class="col-md-4 col-sm-6">
                        <div class="card mb-4 shadow-sm imgBgCard click-col">
                            <img class="card"src="https://images.unsplash.com/photo-1571639543218-31008677212d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                            class="w-100"></img>
                            <div class="card-body">
                                <p class="card-text">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia quasi dolorum, distinctio soluta accusamus numquam quas harum ex minus voluptatum.
                                </p>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">
                                        Contact
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary ml-1">
                                        Découvrir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Team;