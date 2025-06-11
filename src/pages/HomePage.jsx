import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, Card, CardMedia, CardContent, Modal
} from '@mui/material';
import Header from '../components/Header';
import TourCard from '../components/TourCard';
import { getFeaturedTours } from '../services/api';
import { Link } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    getFeaturedTours().then(setTours);
    const fetchData = async () => {
      const [newsRes, eventsRes] = await Promise.all([
        axios.get('https://hochu-tur-back.onrender.com/news?_sort=date&_order=desc&_limit=3'),
        axios.get('https://hochu-tur-back.onrender.com/events?_sort=date&_order=desc&_limit=3'),
      ]);
      setNews(newsRes.data);
      setEvents(eventsRes.data);
    };
    fetchData();
  }, []);

  const renderCards = (items, type) => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 2, mb: 4 }}>
      {items.map(item => (
        <Box
          key={item.id}
          sx={{
            flex: {
              xs: '1 1 100%',
              sm: '1 1 calc(50% - 12px)',
              md: '1 1 calc((100% - 48px) / 3)'
            },
            maxWidth: {
              xs: '100%',
              sm: 'calc(50% - 12px)',
              md: 'calc((100% - 48px) / 3)'
            },
            cursor: 'pointer'
          }}
          onClick={() => type === 'news' ? setSelectedNews(item) : setSelectedEvent(item)}
        >
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="160"
              image={`/images/${item.image}`}
              alt={item.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(item.date)}
              </Typography>
              {type === 'events' && (
                <Typography variant="body2">{item.location}</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      {/* Баннер */}
      <Box sx={{
        backgroundImage: `url('/images/arkhyz-banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '40vh', md: '60vh' },
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        textShadow: '1px 1px 4px #000'
      }}>
        <Typography variant={{ xs: 'h5', md: 'h3' }} component="h1">
          Путешествия по Архызу
        </Typography>
      </Box>

      <Container sx={{ mt: 4 }}>

        {/* Популярные туры */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: { xs: 'center', sm: 'left' },
          mb: 4,
          gap: 2
        }}>
          <Typography variant="h5">Популярные туры</Typography>
          <Button variant="outlined" component={Link} to="/tours">Все туры</Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'space-between'
          }}
        >
          {tours.map(tour => (
            <Box
              key={tour.id}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 12px)',
                  md: '1 1 calc((100% - 48px) / 3)'
                },
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 12px)',
                  md: 'calc((100% - 48px) / 3)'
                }
              }}
            >
              <TourCard tour={tour} />
            </Box>
          ))}
        </Box>

        {/* Новости */}
        <Box mt={8}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' },
            mb: 4,
            gap: 2
          }}>
            <Typography variant="h5">Последние новости</Typography>
            <Button variant="outlined" component={Link} to="/news">Все новости</Button>
          </Box>
          {renderCards(news, 'news')}
        </Box>

        {/* Мероприятия */}
        <Box mt={8}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' },
            mb: 4,
            gap: 2
          }}>
            <Typography variant="h5">Ближайшие мероприятия</Typography>
            <Button variant="outlined" component={Link} to="/events">Все мероприятия</Button>
          </Box>
          {renderCards(events, 'events')}
        </Box>
      </Container>

      {/* Модалка Новости */}
      <Modal open={!!selectedNews} onClose={() => setSelectedNews(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 600 },
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          {selectedNews && (
            <>
              <Typography variant="h5" gutterBottom>{selectedNews.title}</Typography>
              <Typography variant="subtitle2" gutterBottom>{formatDate(selectedNews.date)}</Typography>
              <Box sx={{ my: 2 }}>
                <img src={`/images/${selectedNews.image}`} alt={selectedNews.title} style={{ width: '100%' }} />
              </Box>
              <Typography variant="body1">{selectedNews.content}</Typography>
              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <Button onClick={() => setSelectedNews(null)} variant="outlined">Закрыть</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Модалка Мероприятие */}
      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 600 },
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          {selectedEvent && (
            <>
              <Typography variant="h5" gutterBottom>{selectedEvent.title}</Typography>
              <Typography variant="subtitle2" gutterBottom>{formatDate(selectedEvent.date)}</Typography>
              <Typography variant="subtitle2" gutterBottom>{selectedEvent.location}</Typography>
              <Box sx={{ my: 2 }}>
                <img src={`/images/${selectedEvent.image}`} alt={selectedEvent.title} style={{ width: '100%' }} />
              </Box>
              <Typography variant="body1">{selectedEvent.description}</Typography>
              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <Button onClick={() => setSelectedEvent(null)} variant="outlined">Закрыть</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;
