import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Modal, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Paper, TextField, Dialog, DialogTitle, DialogActions
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:3001/events';

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
  });

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке мероприятий', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      image: '',
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (eventItem) => {
    setEditMode(true);
    setCurrentEvent(eventItem);
    setFormData(eventItem);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${currentEvent.id}`, formData);
      } else {
        await axios.post(API_URL, { ...formData, id: Date.now().toString() });
      }
      setOpenModal(false);
      fetchEvents();
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchEvents();
    } catch (error) {
      console.error('Ошибка при удалении', error);
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenAdd}
        sx={{ mb: 2 }}
      >
        Добавить мероприятие
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Место</TableCell>
              <TableCell>Картинка</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.image}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEdit(event)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => setConfirmDeleteId(event.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Модалка добавления / редактирования */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editMode ? 'Редактировать мероприятие' : 'Добавить мероприятие'}
          </Typography>

          <TextField
            label="Название"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Описание"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Дата"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Место"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            fullWidth
          />
          <TextField
            label="Изображение (имя файла)"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? 'Сохранить' : 'Добавить'}
          </Button>
        </Box>
      </Modal>

      {/* Модалка подтверждения удаления */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Удалить мероприятие?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Отмена</Button>
          <Button onClick={handleDelete} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventsAdmin;
