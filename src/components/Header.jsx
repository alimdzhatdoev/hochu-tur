import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Хочу тур — Архыз
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/tours">Туры</Button>
          <Button color="inherit" component={Link} to="/news">Новости</Button>
          <Button color="inherit" component={Link} to="/events">Мероприятия</Button>
          <Button color="inherit" component={Link} to="/about">О нас</Button>
          <Button color="inherit" component={Link} to="/contacts">Контакты</Button>
          <Button color="inherit" component={Link} to="/account">Профиль</Button>

          {user?.role === 'admin' && (
            <Button color="inherit" component={Link} to="/admin">Админ-панель</Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
