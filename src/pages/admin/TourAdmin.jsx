import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Modal, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Paper, TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogActions
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:3001/tours';

const TourAdmin = () => {
  const [tours, setTours] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    country: '',
    description: '',
    price: '',
    startDate: '',
    endDate: '',
    image: '',
    isFeatured: false,
  });

  const fetchTours = async () => {
    try {
      const res = await axios.get(API_URL);
      setTours(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке туров', error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({
      title: '',
      country: '',
      description: '',
      price: '',
      startDate: '',
      endDate: '',
      image: '',
      isFeatured: false,
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (tour) => {
    setEditMode(true);
    setCurrentTour(tour);
    setFormData(tour);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${currentTour.id}`, formData);
      } else {
        await axios.post(API_URL, { ...formData, id: Date.now().toString() });
      }
      setOpenModal(false);
      fetchTours();
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchTours();
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
        Добавить тур
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Страна</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Период</TableCell>
              <TableCell>Избранный</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell>{tour.title}</TableCell>
                <TableCell>{tour.country}</TableCell>
                <TableCell>{tour.price} ₽</TableCell>
                <TableCell>{formatDate(tour.startDate)} — {formatDate(tour.endDate)}</TableCell>
                <TableCell>{tour.isFeatured ? 'Да' : 'Нет'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEdit(tour)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => setConfirmDeleteId(tour.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Модалка для добавления / редактирования */}
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
            {editMode ? 'Редактировать тур' : 'Добавить тур'}
          </Typography>

          <TextField
            label="Название"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Страна"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            fullWidth
          />
          <TextField
            label="Описание"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Цена"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
            fullWidth
          />
          <TextField
            label="Дата начала"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Дата окончания"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Изображение (имя файла)"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
            }
            label="Выделить как избранный тур"
          />
          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? 'Сохранить изменения' : 'Добавить'}
          </Button>
        </Box>
      </Modal>

      {/* Модалка подтверждения удаления */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Удалить тур?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Отмена</Button>
          <Button onClick={handleDelete} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TourAdmin;
