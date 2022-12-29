import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/Home"
import Exchanges from "./components/Exchanges"
import Coins from "./components/Coins"

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/exchanges' element={<Exchanges></Exchanges>}></Route>
        <Route path='/coins' element={<Coins></Coins>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App
