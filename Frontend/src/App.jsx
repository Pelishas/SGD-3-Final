import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';

const Register = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">👶</div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Our Family</h2>
                    <p className="text-gray-600">Create your Mom & Tot Tracker account</p>
                </div>
                
                <form className="space-y-6">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <div>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                            <option>👩‍👧‍👦 Mother/Patient</option>
                            <option>👨‍⚕️ Doctor/Physician</option>
                        </select>
                    </div>
                    <button className="w-full btn btn-primary py-3 text-lg">
                        🚀 Create Account
                    </button>
                </form>
                
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? 
                    <a href="/login" className="text-primary hover:text-pink-600 font-semibold ml-1">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;