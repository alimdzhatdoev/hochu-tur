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
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import Footer from './components/Footer';
import Header from './components/Header';
import { Box } from '@mui/material';

function App() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Header />

      {/* Контейнер для основного контента */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: { xs: '0px' }, // под AppBar разных размеров
          minHeight: 'calc(100vh - 56px - 100px)' // для случая, если Footer фиксированной высоты
        }}
      >
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
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

      <InstallButton />
    </>
  );
}

export default App;
