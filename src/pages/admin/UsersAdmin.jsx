import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Modal, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Paper, TextField, Dialog, DialogTitle,
  DialogActions, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'https://hochu-tur-back.onrender.com/users';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ name: '', email: '', role: 'user' });
    setOpenModal(true);
  };

  const handleOpenEdit = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setFormData(user);
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${currentUser.id}`, formData);
      } else {
        await axios.post(API_URL, { ...formData, id: Date.now().toString() });
      }
      setOpenModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Ошибка при сохранении', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchUsers();
    } catch (error) {
      console.error('Ошибка при удалении', error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const user = users.find(u => u.id === id);
      await axios.put(`${API_URL}/${id}`, { ...user, role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Ошибка при смене роли', error);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpenAdd}
        sx={{ mb: 2 }}
      >
        Добавить пользователя
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="user">Пользователь</MenuItem>
                    <MenuItem value="admin">Администратор</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEdit(user)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => setConfirmDeleteId(user.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Модалка для редактирования / добавления */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6">
            {editMode ? 'Редактировать пользователя' : 'Добавить пользователя'}
          </Typography>

          <TextField
            label="Имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Роль</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              label="Роль"
            >
              <MenuItem value="user">Пользователь</MenuItem>
              <MenuItem value="admin">Администратор</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? 'Сохранить' : 'Добавить'}
          </Button>
        </Box>
      </Modal>

      {/* Модалка подтверждения удаления */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Удалить пользователя?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Отмена</Button>
          <Button onClick={handleDelete} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersAdmin;
