import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Typography, Box, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const serviceMap = {
  guide: 'Гид',
  equipment: 'Снаряжение',
  horse: 'Лошади',
  quad: 'Квадроцикл'
};

const AdminRequests = () => {
  const [bookings, setBookings] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost:3001/bookings').then(res => setBookings(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить заявку?')) return;
    await axios.delete(`http://localhost:3001/bookings/${id}`);
    fetchData();
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(`http://localhost:3001/bookings/${id}`, { status: newStatus });
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Все заявки</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Тур</TableCell>
            <TableCell>Дата тура</TableCell>
            <TableCell>Дата заявки</TableCell>
            <TableCell>Участников</TableCell>
            <TableCell>Услуги</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Удалить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(req => (
            <TableRow key={req.id}>
              <TableCell>{req.name}</TableCell>
              <TableCell>{req.phone}</TableCell>
              <TableCell>{req.email || req.userEmail}</TableCell>
              <TableCell>{req.tourTitle}</TableCell>
              <TableCell>{new Date(req.date).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell>{new Date(req.createdAt).toLocaleString('ru-RU')}</TableCell>
              <TableCell>{req.people}</TableCell>
              <TableCell>
                {(req.services || []).map(s => serviceMap[s] || s).join(', ') || '—'}
              </TableCell>
              <TableCell>{req.total?.toLocaleString() || '—'} ₽</TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={req.status || 'pending'}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                >
                  <MenuItem value="pending">Ожидает</MenuItem>
                  <MenuItem value="confirmed">Подтверждено</MenuItem>
                  <MenuItem value="rejected">Отклонено</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(req.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminRequests;
