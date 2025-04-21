import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#22333B',
      light: '#2F4651',
      dark: '#1A262C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#C6AC8E',
      light: '#D6BEA4',
      dark: '#B69A7C',
      contrastText: '#22333B',
    },
    background: {
      default: '#EAE0D5',
      paper: '#F5F0EA',
    },
    text: {
      primary: '#22333B',
      secondary: '#5B6D75',
    }
  },
  typography: {
    fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h4: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Inter", "Montserrat", sans-serif',
    },
    body2: {
      fontFamily: '"Inter", "Montserrat", sans-serif',
    },
    button: {
      fontFamily: '"Inter", "Montserrat", sans-serif',
      textTransform: 'none',
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#EAE0D5',
          backgroundImage: 'radial-gradient(circle at 60% 70%, rgba(198, 172, 142, 0.1) 0%, rgba(234, 224, 213, 0) 40%), radial-gradient(circle at 20% 20%, rgba(198, 172, 142, 0.12) 0%, rgba(234, 224, 213, 0) 50%)',
          backgroundAttachment: 'fixed',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(34, 51, 59, 0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #22333B 0%, #2F4651 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #C6AC8E 0%, #D6BEA4 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: 'all 0.3s ease',
          border: 'none',
          backdropFilter: 'blur(8px)',
        },
        elevation1: {
          boxShadow: '0px 10px 28px rgba(34, 51, 59, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 15px 35px rgba(34, 51, 59, 0.08)',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'hidden',
          border: 'none',
          backgroundColor: alpha('#F5F0EA', 0.7),
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(34, 51, 59, 0.95) 0%, rgba(47, 70, 81, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
        },
      },
    },
  MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          background: 'linear-gradient(90deg, #C6AC8E 0%, #D6BEA4 100%)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: alpha('#22333B', 0.2),
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: alpha('#22333B', 0.4),
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C6AC8E',
            },
          },
        },
      },
    },
  },
});

export default theme;

