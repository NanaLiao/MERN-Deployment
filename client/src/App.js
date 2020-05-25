import React from 'react';
import './App.css';
import { Redirect, Router, Link } from '@reach/router';


import AllPirates from './views/AllPirates';
import NewPirate from './views/NewPirate';
import SinglePirate from './views/SinglePirate';
import Login from './views/Login';



function App() {
  return (
    <div className="App">

      <Router>
        <Login path="login"/>
        <AllPirates path="pirates"/>
        <NewPirate path="pirates/new"/>
        <SinglePirate path="pirates/:id"/>
        <Redirect
          from="/"
          to="/pirates"
          noThrow
        />
      </Router>
    </div>
  );
}

export default App;
