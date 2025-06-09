import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Alert, Link
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.get(`http://localhost:3001/users?email=${form.email}&password=${form.password}`);

      if (res.data.length === 0) {
        setError('Неверный email или пароль');
        return;
      }

      const user = res.data[0];
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } catch (err) {
      setError('Ошибка при входе');
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 6, minHeight: '78vh' }}>
        <Typography variant="h4" gutterBottom>Вход</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">Войти</Button>
          <Typography variant="body2">
            Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
