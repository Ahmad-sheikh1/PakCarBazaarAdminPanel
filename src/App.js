import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))


// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth ()


function App() {

  useEffect(() => {
    themeChange(false);
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme); // Set the theme attribute on the root element
}, []);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />
          {/* <Route path="*" element={<Navigate to={token ? "/app/dashboard" : "/login"} replace />} /> */}

        </Routes>
      </Router>
    </>
  )
}

export default App
