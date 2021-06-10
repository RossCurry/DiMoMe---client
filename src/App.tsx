import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './containers/dashboard/Dashboard.container';
import Navbar from './components/navBar/Navbar.component';
import Home from './components/home/Home.container';
import Subscribe from './components/subscribe/Subscribe.component';
import Login from './components/login/Login.component';
import Profile from './components/profile/Profile.component';
import EditProfile from './components/editProfile/EditProfile.component';
import EditMenu from './containers/editMenu/EditMenu.container';

const App = (): JSX.Element => {
  return (
    <div>
      <Dashboard />
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/subscribe" exact component={Subscribe} />
          <Route path="/login" exact component={Login} />
          <Route path="/Profile/:id" exact component={Profile} />
          <Route path="/editProfile/:id" exact component={EditProfile} />
          <Route path="/editMenu/:id/:localName" exact component={EditMenu} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
