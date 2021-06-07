import React from 'react';
import { Link } from 'react-router-dom';
import './Home.styles.scss';
import mobileqr from '../../assets/svg/mobileQR.svg';

const Home = (): JSX.Element => {
  return (
    <div>
      <section className="home-section">
        <div className="hero-card">
          <div className="hero-text">
            <h2>Digital Mobile Menu</h2>
            <p>
              Convert your menu to an interactive,{' '}
              <strong>mobile friendly</strong>
              version in minutes
            </p>
            <div className="hero-invite">
              <h2>Try for Free!</h2>
              <Link to={'/subscribe' as string}>
                <button type="button">CREATE</button>
              </Link>
            </div>
          </div>
          <div className="hero-img">
            <img
              src={mobileqr}
              className="hero-img-bg"
              alt="icon logo for DiMoMe"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
