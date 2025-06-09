import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Modal, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Paper, TextField, Dialog, DialogTitle, DialogActions
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'https://hochu-tur-back.onrender.com/news';

const NewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    image: '',
  });

  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL);
      setNews(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке новостей', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({
      title: '',
      content: '',
      date: '',
      image: '',
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditMode(true);
    setCurrentNews(item);
    setFormData(item);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${currentNews.id}`, formData);
      } else {
        await axios.post(API_URL, { ...formData, id: Date.now().toString() });
      }
      setOpenModal(false);
      fetchNews();
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchNews();
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
        Добавить новость
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Заголовок</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Картинка</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>{item.image}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEdit(item)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => setConfirmDeleteId(item.id)}><Delete /></IconButton>
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
            {editMode ? 'Редактировать новость' : 'Добавить новость'}
          </Typography>

          <TextField
            label="Заголовок"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Текст"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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

      {/* Подтверждение удаления */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Удалить новость?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Отмена</Button>
          <Button onClick={handleDelete} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsAdmin;
