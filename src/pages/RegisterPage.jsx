import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Alert, Link
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.get(`https://hochu-tur-back.onrender.com/users?email=${form.email}`);
      if (res.data.length > 0) {
        setError('Пользователь с таким email уже существует');
        return;
      }

      await axios.post('https://hochu-tur-back.onrender.com/users', form);
      navigate('/login');
    } catch (err) {
      setError('Ошибка при регистрации');
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 6, minHeight: '78vh' }}>
        <Typography variant="h4" gutterBottom>Регистрация</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="name" label="Имя" value={form.name} onChange={handleChange} required />
          <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
          <TextField name="password" label="Пароль" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained">Зарегистрироваться</Button>
          <Typography variant="body2">
            Есть аккаунт? <Link href="/login">Войти</Link>
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;
