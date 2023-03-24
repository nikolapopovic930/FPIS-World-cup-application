import React from 'react';
import './Application.sass';
import Menu from '../menu/menu';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Stadium from '../stadium/stadium';
import Home from './Home/Home';

function Application() {
  return (
    
    <div className="backround">
    <div className="bigcontainer">
  
    <BrowserRouter>
    <Menu />
      <Routes>
        <Route path="/" element= { <Home /> } />
        <Route path="/stadium" element= { <Stadium /> }/>



      </Routes>
      
    </BrowserRouter>
    
    

    </div>
    
    </div>
  );
}

export default Application;
