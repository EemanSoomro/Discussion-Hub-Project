import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Footer from './component/Footer';
import Societies from './component/Societies';
import SocietyDetails from "./component/SocietyDetails";
import Project from './component/Project';
import Discussion from './component/Discussion';
import Announcements from './component/Announcements';
import Navbar from './component/Navbar';

function App() {
    return (
        <Router> {/* Wrap the entire app in Router */}
            <AppContent /> 
        </Router>
    );
}

function AppContent() {
    const location = useLocation(); // This will now work inside the Router context

    return (
        <div className="App">
            {/* Show Navbar and Footer only if the route is not Login */}
            {location.pathname !== '/login' && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/societies" element={<Societies />} />
                <Route path="/societies/:id" element={<SocietyDetails />} />
                <Route path="/project" element={<Project/>} />
                <Route path="/discussion" element={<Discussion />} />
                <Route path="/announcements" element={<Announcements />} />
            </Routes>

            {/* Show Footer only if the route is not Login */}
            {location.pathname !== '/login' && <Footer />}
        </div>
    );
}

export default App;
