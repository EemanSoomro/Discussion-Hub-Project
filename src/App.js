import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Footer from './component/Footer';
import Societies from './component/Societies';
import SocietyDetails from './component/SocietyDetails';
import Project from './component/Project';
import Discussion from './component/Discussion';
import Announcements from './component/Announcements';
import Navbar from './component/Navbar';
import ProjectDetails from './component/ProjectDetails'; // Import the ProjectDetails component

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/societies" element={<Societies />} />
        <Route path="/societies/:id" element={<SocietyDetails />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetails />} /> {/* Added ProjectDetails route */}
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>

      {location.pathname !== '/login' && location.pathname !== '/register' && <Footer />}
    </div>
  );
}

export default App;
