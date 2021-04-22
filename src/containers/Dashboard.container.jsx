import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './Dashboard.styles.scss';

import Home from '../components/Home.container'

function Dashboard(props) {
  return (
    <Router>
      <Switch>
        
        <div className="dashboard">
        
        {/* <h2>Dashboard</h2> */}
        {/* <Home /> */}
        </div>
      </Switch>
    </Router>
  );
}

export default Dashboard;