import React from 'react';
import './Application.sass';
import Menu from '../menu/menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stadium from '../stadium/stadium';
import Home from './Home/Home';
import Matches from '../Matches/Matches';

function Application() {
  return (
    
    <div className="backround">
    <div className="bigcontainer">
  
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element= { <Home /> } />
        <Route path="/stadium" element= { <Stadium /> }/>
        <Route path="/matches" element= { <Matches /> }/>



      </Routes>
      
    </BrowserRouter>
    
    

    </div>
    
    </div>
  );
}

export default Application;
