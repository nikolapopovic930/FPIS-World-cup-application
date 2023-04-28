import React from 'react';
import './Application.sass';
import Menu from '../menu/menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stadium from '../stadium/stadium';
import Home from './Home/Home';
import Matches from '../Matches/Matches';
import Groups from '../Groups/Groups';
import ScheduleAMatch from '../ScheduleAMatch/ScheduleAMatch';
import AddGroup from '../Groups/AddGroup';
import EditGroup from '../Groups/EditGroup';
import AddTeamInGroup from '../Groups/AddTeamInGroup';

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
        <Route path="/scheduleamatch" element= { <ScheduleAMatch /> }/>
        <Route path="/groups" element= { <Groups /> }/>
        <Route path="/addgroup" element= { <AddGroup /> }/>
        <Route path="/editgroup/:group_id" element={<EditGroup />} />
        <Route path="/addteamingroup/:group_id" element={<AddTeamInGroup />} />




      </Routes>
      
    </BrowserRouter>
    
    

    </div>
    
    </div>
  );
}

export default Application;
