import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';
import Header from '../components/Header';
import { sendContactMessage } from '../services/api';

const ContactsPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(form); // отправляем на json-server
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Ошибка при отправке сообщения:', err);
    }
  };

  return (
    <>
      <Container sx={{ mt: 4, mb: 6, minHeight: '75vh' }}>
        <Typography variant="h4" gutterBottom>Контакты</Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1"><strong>Адрес:</strong> Республика Карачаево-Черкесия, п. Архыз</Typography>
          <Typography variant="body1"><strong>Телефон:</strong> +7 (999) 123-45-67</Typography>
          <Typography variant="body1"><strong>Email:</strong> info@hochuvtur.ru</Typography>
        </Box>

        <Typography variant="h5" gutterBottom>Форма обратной связи</Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ maxWidth: 500 }}>
            <TextField
              label="Ваше имя"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
              required
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
              required
            />
            <TextField
              label="Сообщение"
              value={form.message}
              onChange={handleChange('message')}
              fullWidth
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained">Отправить</Button>
            {sent && <Alert severity="success">Сообщение отправлено!</Alert>}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default ContactsPage;
