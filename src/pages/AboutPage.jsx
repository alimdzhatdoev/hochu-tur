import React from 'react';
import { Container, Typography, Box, Divider, Stack } from '@mui/material';
import Header from '../components/Header';

const AboutPage = () => {
  return (
    <>
      <Container sx={{ mt: 4, mb: 6, minHeight: '75vh' }}>
        <Typography variant="h4" gutterBottom>
          О нас
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          «Хочу тур» — это команда увлечённых путешественников, которые влюблены в Архыз и хотят
          поделиться его красотой с вами. Мы организуем походы, экскурсии, снегоходные и
          квадро-поездки по самым живописным уголкам этого удивительного региона.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>Наша миссия</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Мы верим, что отдых в горах может быть доступным, безопасным и незабываемым. Мы стремимся
          сделать каждый тур особенным — будь то семейная прогулка или экстремальное приключение.
        </Typography>

        <Typography variant="h5" gutterBottom>Почему выбирают нас</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box>
            <Typography variant="subtitle1">🏕 Опытные гиды</Typography>
            <Typography variant="body2">Каждый маршрут сопровождают лицензированные инструкторы.</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">🌄 Уникальные маршруты</Typography>
            <Typography variant="body2">Мы не ходим по туристическим тропам — мы открываем настоящее.</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">🛡 Безопасность на первом месте</Typography>
            <Typography variant="body2">Экипировка, страхование, поддержка — всё под контролем.</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">💬 Обратная связь</Typography>
            <Typography variant="body2">Мы всегда на связи до, во время и после тура.</Typography>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default AboutPage;
