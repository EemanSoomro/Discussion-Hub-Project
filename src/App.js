import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext"; // Ensure AuthContext is imported
import Register from "./component/User/Register/Register";
import Login from "./component/User/Login/Login";
import Discussion from "./component/Discussion/Discussion";
import Home from "./component/Home/Home";
import Footer from "./component/Footer/Footer";
import Societies from "./component/Societies/Societies";
import SocietyDetails from "./component/SocietyDetails/SocietyDetails";
import Project from "./component/Project/Project";
import Announcements from "./component/Announcements/Announcements";
import Navbar from "./component/Navbar/Navbar";
import ProjectDetails from "./component/ProjectDetails/ProjectDetails"; // Import the ProjectDetails component

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { user } = useContext(AuthContext); // Get user from context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate(location.pathname);
      } else {
        navigate("/login"); // Redirect unauthenticated users
      }
    }
  }, [user, navigate, location.pathname]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="App">
      {/* Render Navbar unless on login or register pages */}
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/societies/:id" element={<SocietyDetails />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/announcements" element={<Announcements />} />
          </>
        )}
      </Routes>

      {/* Render Footer unless on login or register pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
