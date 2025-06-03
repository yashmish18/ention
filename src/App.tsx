// src/App.tsx
import React from "react"
import { ThemeProvider } from "styled-components"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { theme } from "./theme"
import { GlobalStyle } from "./globalStyles"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Support from "./pages/Support"
import Navbar from "./components/Navbar"

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {location.pathname !== "/support" && <Navbar />}
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer dark={isAuthPage} />
    </>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
)

export default App
