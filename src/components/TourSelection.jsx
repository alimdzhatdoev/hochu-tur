import React, { useState, useEffect } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Checkbox, FormGroup, FormControlLabel, TextField, Button
} from '@mui/material';
import axios from 'axios';

const extraServices = [
  { label: 'Гид', value: 'guide' },
  { label: 'Снаряжение', value: 'equipment' },
  { label: 'Лошади', value: 'horse' },
  { label: 'Квадроцикл', value: 'quad' },
];

const TourSelection = ({ onApply }) => {
  const [availableTypes, setAvailableTypes] = useState([]);
  const [type, setType] = useState('');
  const [participants, setParticipants] = useState('');
  const [services, setServices] = useState([]);

  // Загружаем типы туров из БД
  useEffect(() => {
    axios.get('https://hochu-tur-back.onrender.com/tours').then(res => {
      const uniqueTypes = [...new Set(res.data.map(t => t.type))];
      setAvailableTypes(uniqueTypes);
    });
  }, []);

  const toggleService = (val) => {
    setServices(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const applyFilters = () => {
    onApply({
      type,
      participants,
      services
    });
  };

  return (
    <Box sx={{ mb: 3, borderRadius: 2, background: '#f5f5f5', border: '1px solid rgba(0, 0, 0, 0.23)' , p: 2}}>
      <Typography variant="h6" gutterBottom>Подбор тура</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Тип тура</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Тип тура"
        >
          <MenuItem value="">Любой</MenuItem>
          {availableTypes.map(t => (
            <MenuItem key={t} value={t}>
              {t === 'hiking' && 'Пеший'}
              {t === 'horse' && 'Конный'}
              {t === 'quad' && 'Квадроциклы'}
              {t === 'combined' && 'Комбинированный'}
              {!['hiking', 'horse', 'quad', 'combined'].includes(t) && t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Количество участников"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle1" gutterBottom>Дополнительные услуги</Typography>
      <FormGroup row>
        {extraServices.map(s => (
          <FormControlLabel
            key={s.value}
            control={
              <Checkbox
                checked={services.includes(s.value)}
                onChange={() => toggleService(s.value)}
              />
            }
            label={s.label}
          />
        ))}
      </FormGroup>

      <Button variant="contained" sx={{ mt: 2 }} onClick={applyFilters}>
        Найти подходящие туры
      </Button>
    </Box>
  );
};

export default TourSelection;
