import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import Jobs from "./components/Jobs";
import Bookmarks from "./components/Bookmarks";
import JobDetails from "./components/JobDetails";
import "./App.css"; 
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/jobs" />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/job/:id" element={<JobDetails />} />
            </Routes>
          </div>
          <nav className="bottom-nav">
            <NavLink
              to="/jobs"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <strong>JOBS</strong>
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <strong>BOOKMARKS</strong>
            </NavLink>
          </nav>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
