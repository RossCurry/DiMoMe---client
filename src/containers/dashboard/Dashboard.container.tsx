import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './Dashboard.styles.scss';

const Dashboard = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <div className="dashboard" />
      </Switch>
    </Router>
  );
};

export default Dashboard;
