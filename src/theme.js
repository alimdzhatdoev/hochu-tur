import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#365C4F',
    },
    secondary: {
      main: '#7BB2A2',
    },
    background: {
      default: '#F1F5F4',
    },
    text: {
      primary: '#1C2D26',
    },
  },
  typography: {
    fontFamily: `'Rubik', 'Roboto', 'Arial', sans-serif`,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  }
});

export default theme;
