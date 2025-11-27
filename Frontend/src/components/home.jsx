import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <h1>Welcome to Mom & Tot Tracker</h1>
                <p className="subtitle">Your seamless partner in maternal and child health from conception to age five.</p>
                <div className="cta-buttons">
                    <Link to="/register" className="btn primary-btn">Start Tracking Today</Link>
                    <Link to="/login" className="btn secondary-btn">Existing User Login</Link>
                </div>
            </section>

            <hr/>

            <section className="features-section">
                <h2>Why Choose Mom & Tot Tracker?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Real-Time Health Monitoring</h3>
                        <p>Submit detailed health reports instantly. Our system flags severe symptoms, sending emergency alerts to doctors immediately via WebSockets.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Child Progress & Milestones</h3>
                        <p>Track your child's development from 0 months to 5 years. Log vaccination records, milestones, and growth metrics easily.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Community & Peer Support</h3>
                        <p>Connect with other mothers in your region or stage of pregnancy through live chat and community forums.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Easy Appointment Scheduling</h3>
                        <p>View doctor availability, book checkups, and manage all your maternal and pediatric appointments in one place.</p>
                    </div>
                </div>
            </section>

            <hr/>
            
            <section className="call-to-action-bottom">
                <h2>Ready to take control of your health journey?</h2>
                <Link to="/register" className="btn primary-btn large">Sign Up Now - It's Free!</Link>
            </section>
        </div>
    );
};

export default Home;