import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Background from './assets/BG_imgs/emy-XoByiBymX20-unsplash.jpg'

// COMPONENTS
import Dashboard from './containers/Dashboard.container'
import Navbar from "./components/Navbar.component";
import Home from './components/Home.container'
import Subscribe from "./components/Subscribe.component";
import Login from "./components/Login.component";
import Profile from "./components/Profile.component";
import EditProfile from "./components/EditProfile.component";
import EditMenu from './containers/EditMenu.container'

function App() {
  return (
    <div >
      {/* <img src={Background} /> */}
      <Dashboard />
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/subscribe' exact component={Subscribe} />
            <Route path='/login' exact component={Login} />
            <Route path='/Profile/:id' exact component={Profile} />
            <Route path='/editProfile/:id' exact component={EditProfile} />
            <Route path='/editMenu/:id/:localName' exact component={EditMenu} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
