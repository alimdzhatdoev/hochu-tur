import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const serviceMap = {
  guide: 'Гид',
  equipment: 'Снаряжение',
  horse: 'Лошади',
  quad: 'Квадроцикл'
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      fetchBookings(parsed.id);
    }
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await axios.get(`https://hochu-tur-back.onrender.com/bookings?userId=${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error('Ошибка при загрузке заявок', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusChip = (status) => {
    if (status === 'confirmed') return <Chip label="Подтверждено" color="success" />;
    if (status === 'rejected') return <Chip label="Отклонено" color="error" />;
    return <Chip label="Ожидает" color="warning" />;
  };

  if (!user) return null;

  return (
    <Container sx={{ mt: 5, mb: 6, minHeight: '75vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>Личный кабинет</Typography>
          <Typography variant="h6">Привет, {user.name}!</Typography>
        </Box>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Выйти
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>Мои заявки</Typography>
      {bookings.length === 0 ? (
        <Typography>Заявки не найдены.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Тур:</strong> {booking.tourTitle}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Дата тура:</strong> {formatDate(booking.date)}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Заявка от:</strong> {formatDate(booking.createdAt)}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Участников:</strong> {booking.people}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Услуги:</strong>{' '}
                    {booking.services && booking.services.length > 0
                      ? booking.services.map((s) => serviceMap[s] || s).join(', ')
                      : 'Нет'}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Сумма:</strong> {booking.total?.toLocaleString() || '—'} ₽
                  </Typography>

                  <Box mt={2}>
                    {getStatusChip(booking.status)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AccountPage;
