import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="animate-pulse mb-6">
                        <span className="text-6xl">🤰👶</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 animate-fade-in">
                        Mom & Tot Tracker
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Your seamless partner in maternal and child health from conception to age five.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/register" className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                            🚀 Start Tracking Today
                        </Link>
                        <Link to="/login" className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                            👋 Existing User Login
                        </Link>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 animate-bounce delay-100">
                    <div className="w-16 h-16 bg-primary/20 rounded-full"></div>
                </div>
                <div className="absolute bottom-20 right-10 animate-bounce delay-300">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
                        Why Choose Mom & Tot Tracker?
                    </h2>
                    <p className="text-center text-gray-600 mb-16 text-lg">
                        Comprehensive care for every step of your journey
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="feature-card group">
                            <div className="text-4xl mb-4 group-hover:animate-pulse">🚨</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Real-Time Health Monitoring</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Submit detailed health reports instantly. Our system flags severe symptoms, sending emergency alerts to doctors immediately via WebSockets.
                            </p>
                        </div>
                        
                        <div className="feature-card group">
                            <div className="text-4xl mb-4 group-hover:animate-pulse">✨</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Child Progress & Milestones</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Track your child's development from 0 months to 5 years. Log vaccination records, milestones, and growth metrics easily.
                            </p>
                        </div>
                        
                        <div className="feature-card group">
                            <div className="text-4xl mb-4 group-hover:animate-pulse">💬</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Community & Peer Support</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Connect with other mothers in your region or stage of pregnancy through live chat and community forums.
                            </p>
                        </div>
                        
                        <div className="feature-card group">
                            <div className="text-4xl mb-4 group-hover:animate-pulse">🗓️</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Appointment Scheduling</h3>
                            <p className="text-gray-600 leading-relaxed">
                                View doctor availability, book checkups, and manage all your maternal and pediatric appointments in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="animate-pulse">
                            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                            <div className="text-gray-600">Happy Mothers</div>
                        </div>
                        <div className="animate-pulse delay-100">
                            <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                            <div className="text-gray-600">Healthcare Providers</div>
                        </div>
                        <div className="animate-pulse delay-200">
                            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                            <div className="text-gray-600">Support Available</div>
                        </div>
                        <div className="animate-pulse delay-300">
                            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                            <div className="text-gray-600">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to take control of your health journey?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of mothers who trust us with their family's health
                    </p>
                    <Link to="/register" className="inline-block bg-white text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        🎉 Sign Up Now - It's Free!
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;