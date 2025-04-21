import React, { useState } from 'react';
import './App.css';
import { 
  Container, 
  Typography, 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  CircularProgress,
  Alert,
  Snackbar,
  createTheme,
  ThemeProvider,
  alpha
} from '@mui/material';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// Create a luxurious earthen theme
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
  },
});

function App() {
  const [formData, setFormData] = useState({
    destination: '',
    days: 1,
    preferences: ''
  });
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);

  const generateItinerary = (data) => {
    // Mock itinerary generation (previous implementation)
    const { destination, days, preferences } = data;
    const preferenceKeywords = preferences.toLowerCase().split(/[,.\s]+/).filter(Boolean);
    const activityTypes = preferenceKeywords.length > 0 ? preferenceKeywords : ['sightseeing', 'food', 'culture', 'relaxation'];
    
    return Array.from({ length: days }, (_, dayIndex) => {
      const numActivities = Math.floor(Math.random() * 3) + 3;
      return Array.from({ length: numActivities }, (_, actIndex) => {
        const timeSlots = [
          '9:00 AM', '10:30 AM', '12:00 PM', 
          '2:00 PM', '4:00 PM', '6:00 PM', 
          '8:00 PM'
        ];
        
        const activityTemplates = {
          food: [
            { 
              title: `Local ${destination} Cuisine`,
              description: `Experience authentic local flavors at one of ${destination}'s finest restaurants.`,
              location: `${destination} Food District`,
              tags: ['food', 'local cuisine']
            }
          ],
          culture: [
            {
              title: `${destination} Cultural Tour`,
              description: 'Immerse yourself in local traditions and history.',
              location: `${destination} Heritage District`,
              tags: ['culture', 'history']
            }
          ],
          relaxation: [
            {
              title: 'Luxury Spa Experience',
              description: 'Unwind with premium wellness treatments.',
              location: `${destination} Wellness Center`,
              tags: ['relaxation', 'wellness']
            }
          ]
        };

        const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const category = activityTemplates[type] ? type : 'culture';
        const activity = activityTemplates[category][0];

        return {
          ...activity,
          time: timeSlots[actIndex] || '12:00 PM'
        };
      });
    });
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      setFormData(data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedItinerary = generateItinerary(data);
      setItinerary(generatedItinerary);
      setShowItinerary(true);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <TravelExploreIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Luxury Travel Planner
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ my: 4 }}>
          <TripForm onFormSubmit={handleFormSubmit} />
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress sx={{ color: theme.palette.secondary.main }} />
            </Box>
          )}
          
          {showItinerary && !loading && (
            <ItineraryDisplay 
              destination={formData.destination} 
              days={formData.days} 
              itinerary={itinerary} 
            />
          )}
        </Box>
      </Container>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
