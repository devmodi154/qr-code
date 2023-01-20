import React from 'react';
import bankLogo from './bankLogo.svg';
import './App.css';
import ContactForm from './contactForm';
import ValidateForm from './validateForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className="logo">
          <img src={bankLogo} className="App-logo" alt="bank-logo" />
          <span className='logo-text'>AMMCO BANK</span>
          <p className='logo-subtext'>Adarsh Mahila Mercantile Cooperative Bank Ltd</p>
        </div>
          <Routes>
            <Route path='/' exact element={<ContactForm/>}/>
            <Route path='/validate' exact element={<ValidateForm/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
