// src/App.tsx
import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./theme"
import { GlobalStyle } from "./globalStyles"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import styled from "styled-components"

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Navbar />
    <AboutUs />
    <Footer />
  </ThemeProvider>
)

export default App
