//import logo from './logo.svg';
import React from "react";
import './App.css'; //stylesheet
import Nav from './components/Nav' //navbar 
import Home from './Home'; //Home page
import Mint from './Mint'; //Mint page

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


//bootstrap import
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (

    <section>
      <Router>
        <div>
          <header className="App-header">
            <div>
              ANNOUNCEMENT
            </div>
            <Nav />
          </header>
        </div>
          <div className='accueil bg-dark d-flex w-100 h-100 flex-column justify-content-center align-items-center'>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/mint" element={<Mint/>}/>
                {/* si bouton mint dans la navbar : <Route path="/mint" element={<Mint/>}/> */}
            </Routes>            
          </div>
      </Router>
    </section>

  );
}

export default App;
