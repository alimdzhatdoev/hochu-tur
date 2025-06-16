import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        px: 4,
        backgroundColor: '#2F3E46',
        color: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        © Тур по Архызу, {new Date().getFullYear()}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Link href="/about" underline="hover" color="inherit">
          О нас
        </Link>
        <Link href="/contacts" underline="hover" color="inherit">
          Контакты
        </Link>
        <Link href="/policy" underline="hover" color="inherit">
          Политика конфиденциальности
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
