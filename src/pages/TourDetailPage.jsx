import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack
} from '@mui/material';
import axios from 'axios';
import BookingModal from '../modals/BookingModal';
import LoginRequiredModal from '../modals/LoginRequiredModal';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const typeMap = {
  hiking: 'Пеший',
  horse: 'Конный',
  quad: 'Квадроциклы',
  combined: 'Комбинированный'
};

const serviceMap = {
  guide: 'Гид',
  equipment: 'Снаряжение',
  horse: 'Лошади',
  quad: 'Квадроцикл'
};

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(err => console.error('Ошибка при загрузке тура', err));
  }, [id]);

  const handleClose = () => navigate(-1);

  const handleBookingClick = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setBookingOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  if (!tour) return null;

  return (
    <>
      <Dialog open fullWidth maxWidth="md" onClose={handleClose}>
        <DialogTitle>{tour.title}</DialogTitle>
        <DialogContent dividers>
          <Box
            component="img"
            src={`/images/${tour.image}`}
            alt={tour.title}
            sx={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2
            }}
          />

          <Typography variant="body1" sx={{ mb: 2 }}>
            {tour.description}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Даты тура: {formatDate(tour.startDate)} — {formatDate(tour.endDate)}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Максимальное количество участников: {tour.maxPeople}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Тип тура: <strong>{typeMap[tour.type] || tour.type}</strong>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Дополнительные услуги:
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mt: 1 }}>
            {tour.services && tour.services.length > 0 ? (
              tour.services.map((s, idx) => (
                <Chip key={idx} label={serviceMap[s] || s} />
              ))
            ) : (
              <Chip label="Без дополнительных услуг" />
            )}
          </Stack>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Стоимость: {tour.price.toLocaleString()} ₽
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button variant="contained" color="primary" onClick={handleBookingClick}>
            Забронировать
          </Button>
        </DialogActions>
      </Dialog>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} tour={tour} />
      <LoginRequiredModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default TourDetailPage;
