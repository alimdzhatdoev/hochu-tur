import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import InstallButton from "./InstallButton/InstallButton";
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import Header from './components/Header';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';

import { Box } from '@mui/material';
function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
        <Footer />
      </Box>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/tours/:id" element={<TourDetailPage />} />
        </Routes>
      )}

      <InstallButton />
    </>
  );
}

export default App;
