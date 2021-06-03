import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './Dashboard.styles.scss';

function Dashboard(props) {
  return (
    <Router>
      <Switch>
        <div className="dashboard"></div>
      </Switch>
    </Router>
  );
}

export default Dashboard;
