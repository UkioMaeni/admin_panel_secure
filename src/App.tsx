import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router'
import AuthPage from './pages/auth/auth';
import HomePage from './pages/home/home';
import RedirectPage from './pages/redirect/redirect';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes >
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<RedirectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
