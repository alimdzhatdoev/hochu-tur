import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const user = JSON.parse(localStorage.getItem('user'));

  const navLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Туры', path: '/tours' },
    { label: 'Новости', path: '/news' },
    { label: 'Мероприятия', path: '/events' },
    { label: 'О нас', path: '/about' },
    { label: 'Контакты', path: '/contacts' },
    { label: 'Профиль', path: '/account' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ label: 'Админ-панель', path: '/admin' });
  }

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            Хочу тур — Архыз
          </Typography>

          {isMobile ? (
            <>
              <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Box>
              {navLinks.map(({ label, path }) => (
                <Button key={label} color="inherit" component={Link} to={path}>
                  {label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* для отступа под фиксированный AppBar */}
    </>
  );
};

export default Header;
