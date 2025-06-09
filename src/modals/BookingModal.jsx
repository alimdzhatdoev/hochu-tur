import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';
import axios from 'axios';

const serviceMap = {
  guide: 'Гид',
  equipment: 'Снаряжение',
  horse: 'Лошади',
  quad: 'Квадроцикл'
};

const BookingModal = ({ open, onClose, tour }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: tour?.startDate || '',
    people: 1,
    services: []
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setForm((prev) => ({
        ...prev,
        name: parsed.name || '',
        phone: parsed.phone || '',
        email: parsed.email || ''
      }));
    }
  }, [tour]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service]
    }));
  };

  const totalPrice = useMemo(() => {
    const base = tour?.price || 0;
    const extra = form.services.reduce((sum, val) => {
      if (val === 'guide') return sum + 1500;
      if (val === 'equipment') return sum + 1000;
      if (val === 'horse') return sum + 2000;
      if (val === 'quad') return sum + 3000;
      return sum;
    }, 0);
    return (base + extra) * Number(form.people || 1);
  }, [form.services, form.people, tour?.price]);

  const handleSubmit = async () => {
    const newBooking = {
      ...form,
      total: totalPrice,
      tourId: tour.id,
      tourTitle: tour.title,
      userId: user?.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await axios.post('http://localhost:3001/bookings', newBooking);
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Бронирование тура</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="ФИО"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
            />
            <TextField
              label="Телефон"
              value={form.phone}
              onChange={handleChange('phone')}
              fullWidth
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
            />
            <TextField
              label="Дата участия"
              type="date"
              value={form.date}
              onChange={handleChange('date')}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Количество человек"
              type="number"
              value={form.people}
              onChange={handleChange('people')}
              inputProps={{ min: 1 }}
              fullWidth
            />
            {tour.services && tour.services.length > 0 && (
              <>
                <Typography variant="subtitle1">Дополнительные услуги</Typography>
                <FormGroup row>
                  {tour.services.map((service) => (
                    <FormControlLabel
                      key={service}
                      control={
                        <Checkbox
                          checked={form.services.includes(service)}
                          onChange={() => toggleService(service)}
                        />
                      }
                      label={serviceMap[service] || service}
                    />
                  ))}
                </FormGroup>
              </>
            )}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Итоговая сумма: {totalPrice.toLocaleString()} ₽
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" onClick={handleSubmit}>Забронировать</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successOpen} onClose={handleSuccessClose}>
        <DialogTitle>Заявка отправлена</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} autoFocus>Ок</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingModal;
