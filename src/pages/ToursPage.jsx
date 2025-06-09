import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, MenuItem, Box } from '@mui/material';
import TourCard from '../components/TourCard';
import axios from 'axios';
import TourSelection from '../components/TourSelection';

const ToursPage = () => {
    const [tours, setTours] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [filters, setFilters] = useState(null);

    useEffect(() => {
        axios.get('https://hochu-tur-back.onrender.com/tours').then(res => setTours(res.data));
    }, []);

    const filteredTours = tours
        .filter(tour =>
            tour.title.toLowerCase().includes(search.toLowerCase()) &&
            (!filters?.type || tour.type === filters.type) &&
            (!filters?.participants || tour.maxPeople >= parseInt(filters.participants)) &&
            (!filters?.services || filters.services.every(s => tour.services?.includes(s)))
        )
        .sort((a, b) => {
            if (sort === 'priceAsc') return a.price - b.price;
            if (sort === 'priceDesc') return b.price - a.price;
            if (sort === 'date') return new Date(a.startDate) - new Date(b.startDate);
            return 0;
        });

    return (
        <Container sx={{ mt: 4, minHeight: '80vh' }}>
            <Typography variant="h4" gutterBottom>Все туры</Typography>


            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    label="Поиск по названию"
                    variant="outlined"
                    value={search}
                    sx={{
                        width: 'calc(100% - 200px)'
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    select
                    label="Сортировка"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    sx={{ minWidth: 180 }}
                >
                    <MenuItem value="">Без сортировки</MenuItem>
                    <MenuItem value="priceAsc">Цена: по возрастанию</MenuItem>
                    <MenuItem value="priceDesc">Цена: по убыванию</MenuItem>
                    <MenuItem value="date">По дате начала</MenuItem>
                </TextField>
            </Box>
            
            <TourSelection onApply={setFilters} />

            {filteredTours.length > 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'space-between'
                    }}
                >
                    {filteredTours.map(tour => (
                        <Box
                            key={tour.id}
                            sx={{
                                flex: '1 1 calc((100% - 48px) / 3)',
                                maxWidth: 'calc((100% - 48px) / 3)'
                            }}
                        >
                            <TourCard tour={tour} />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography sx={{ mt: 4 }} variant="h6" color="textSecondary">
                    Подходящие туры не найдены
                </Typography>
            )}

        </Container>
    );
};

export default ToursPage;
