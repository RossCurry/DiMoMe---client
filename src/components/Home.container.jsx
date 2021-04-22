import React from 'react';
import { Link } from 'react-router-dom';

import './Home.styles.scss';
// import img from '../assets/BG_imgs/emy-XoByiBymX20-unsplash.jpg'
import mobileqr from '../assets/svg/mobileQR.svg'

function Home(props) {
  return (
    <div>
      <section className="home-section">

        <div className="hero-card">
          
          <div className="hero-text">
            <h2>Digital Mobile Menu</h2>
            <p>Convert your menu to an interactive, <strong>mobile friendly</strong> version in minutes</p>
            <div className="hero-invite">
              <h2>Try for Free!</h2>
              <Link to={'/subscribe'}>
                <button>CREATE</button>
              </Link>
            </div>
          </div>


          <div className="hero-img">
            <img src={mobileqr} className="hero-img-bg"/>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;