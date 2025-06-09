import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const TourCard = ({ tour }) => {
  const location = useLocation();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        component={Link}
        to={`/tours/${tour.id}`}
        state={{ backgroundLocation: location }}
        sx={{ flexGrow: 1 }}
      >
        <CardMedia
          component="img"
          height="180"
          image={`/images/${tour.image}`}
          alt={tour.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">{tour.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {tour.country} • от {tour.price} ₽
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(tour.startDate)} — {formatDate(tour.endDate)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TourCard;
