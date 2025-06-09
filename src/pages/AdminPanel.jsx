import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import TourAdmin from './admin/TourAdmin';
import NewsAdmin from './admin/NewsAdmin';
import EventsAdmin from './admin/EventsAdmin';
import UsersAdmin from './admin/UsersAdmin';
import AdminRequests from './admin/AdminRequests';

const AdminPanel = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box p={4} minHeight='85vh'>
      <Typography variant="h4" gutterBottom>
        Админ-панель
      </Typography>

      <Tabs value={tab} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label="Туры" />
        <Tab label="Новости" />
        <Tab label="Мероприятия" />
        <Tab label="Пользователи" />
        <Tab label="Заявки" />
      </Tabs>

      {tab === 0 && <TourAdmin />}
      {tab === 1 && <NewsAdmin />}
      {tab === 2 && <EventsAdmin />}
      {tab === 3 && <UsersAdmin />}
      {tab === 4 && <AdminRequests />}
    </Box>
  );
};

export default AdminPanel;
