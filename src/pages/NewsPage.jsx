import React, { useEffect, useState } from 'react';
import {
    Container, Typography, TextField, MenuItem, Box, Card, CardMedia, CardContent, Modal, Button
} from '@mui/material';
import axios from 'axios';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        axios.get('https://hochu-tur-back.onrender.com/news').then(res => setNews(res.data));
    }, []);

    const filteredNews = news
        .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'dateAsc') return new Date(a.date) - new Date(b.date);
            if (sort === 'dateDesc') return new Date(b.date) - new Date(a.date);
            return 0;
        });

    return (
        <Container sx={{ mt: 4, minHeight: '80vh' }}>
            <Typography variant="h4" gutterBottom>Новости</Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    label="Поиск по названию"
                    variant="outlined"
                    value={search}
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
                    <MenuItem value="dateAsc">Сначала старые</MenuItem>
                    <MenuItem value="dateDesc">Сначала новые</MenuItem>
                </TextField>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'space-between' }}>
                {filteredNews.map(item => (
                    <Box
                        key={item.id}
                        sx={{
                            flex: '1 1 calc((100% - 48px) / 3)',
                            maxWidth: 'calc((100% - 48px) / 3)',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelected(item)}
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
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>

            <Modal open={!!selected} onClose={() => setSelected(null)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600, maxHeight: '90vh', overflowY: 'auto',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
                }}>
                    {selected && (
                        <>
                            <Typography variant="h5">{selected.title}</Typography>
                            <Typography variant="body2" gutterBottom>{formatDate(selected.date)}</Typography>
                            <Box sx={{ my: 2 }}>
                                <img src={`/images/${selected.image}`} alt={selected.title} style={{ width: '100%' }} />
                            </Box>
                            <Typography>{selected.content}</Typography>
                            <Box sx={{ textAlign: 'right', mt: 3 }}>
                                <Button onClick={() => setSelected(null)} variant="outlined">Закрыть</Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default NewsPage;
