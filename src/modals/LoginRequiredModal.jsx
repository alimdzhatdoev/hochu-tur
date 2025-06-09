import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginRequiredModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Необходима авторизация</DialogTitle>
      <DialogContent>
        <Typography>Чтобы оставить заявку, пожалуйста, войдите в аккаунт.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleLoginRedirect} variant="contained">Войти</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginRequiredModal;
