import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home'; // Import the Home component
import Login from './component/Login'; // Import the Login component
import Footer from './component/Footer';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Define routes */}
                    <Route path="/" element={<Home />} /> {/* Home page */}
                    <Route path="/login" element={<Login />} /> {/* Login page */}

                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
