// src/App.tsx
import React from "react"
import { ThemeProvider } from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { theme } from "./theme"
import { GlobalStyle } from "./globalStyles"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  </ThemeProvider>
)

export default App
