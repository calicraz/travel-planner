import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Chip,
  Stack,
  alpha,
  useTheme,
  Zoom
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const TripForm = ({ onFormSubmit }) => {
  const theme = useTheme();
  
  const [formData, setFormData] = useState({
    destination: '',
    days: 1,
    preferences: ''
  });
  
  const [focused, setFocused] = useState({
    destination: false,
    days: false,
    preferences: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };
  
  const handleFocus = (field) => {
    setFocused({
      ...focused,
      [field]: true
    });
  };
  
  const handleBlur = (field) => {
    setFocused({
      ...focused,
      [field]: false
    });
  };
  
  const suggestedPreferences = [
    'Luxury', 'Food', 'Adventure', 'Culture', 'Nightlife', 
    'Shopping', 'Beach', 'Nature', 'Art', 'History'
  ];
  
  const addPreference = (pref) => {
    const currentPrefs = formData.preferences.trim();
    const newPrefs = currentPrefs ? `${currentPrefs}, ${pref}` : pref;
    setFormData({
      ...formData,
      preferences: newPrefs
    });
  };

  return (
    <Fade in={true} timeout={800}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 3, md: 3.5 }, 
          mb: 4, 
          background: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(34, 51, 59, 0.05)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
            opacity: 0.8
          },
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(34, 51, 59, 0.08)',
          }
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Destination Input */}
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                name="destination"
                label="Where would you like to go?"
                value={formData.destination}
                onChange={handleChange}
                onFocus={() => handleFocus('destination')}
                onBlur={() => handleBlur('destination')}
                InputProps={{
                  startAdornment: (
                    <MapIcon 
                      sx={{ 
                        mr: 1, 
                        color: focused.destination ? theme.palette.secondary.main : alpha(theme.palette.primary.main, 0.5),
                        transition: 'color 0.3s ease'
                      }} 
                    />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    },
                    '&.Mui-focused': {
                      backgroundColor: alpha(theme.palette.background.paper, 0.9),
                      boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.15)}`
                    }
                  }
                }}
              />
            </Box>

            {/* Days Selection */}
            <Box sx={{ position: 'relative' }}>
              <FormControl fullWidth>
                <InputLabel>Number of Days</InputLabel>
                <Select
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  onFocus={() => handleFocus('days')}
                  onBlur={() => handleBlur('days')}
                  startAdornment={
                    <CalendarMonthIcon 
                      sx={{ 
                        ml: 1, 
                        mr: 1,
                        color: focused.days ? theme.palette.secondary.main : alpha(theme.palette.primary.main, 0.5),
                        transition: 'color 0.3s ease'
                      }} 
                    />
                  }
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    },
                    '&.Mui-focused': {
                      backgroundColor: alpha(theme.palette.background.paper, 0.9),
                      boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.15)}`
                    }
                  }}
                >
                  {[...Array(14)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Day' : 'Days'}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Preferences Input */}
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                name="preferences"
                label="What interests you? (optional)"
                value={formData.preferences}
                onChange={handleChange}
                onFocus={() => handleFocus('preferences')}
                onBlur={() => handleBlur('preferences')}
                InputProps={{
                  startAdornment: (
                    <FavoriteIcon 
                      sx={{ 
                        mr: 1, 
                        color: focused.preferences ? theme.palette.secondary.main : alpha(theme.palette.primary.main, 0.5),
                        transition: 'color 0.3s ease'
                      }} 
                    />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    },
                    '&.Mui-focused': {
                      backgroundColor: alpha(theme.palette.background.paper, 0.9),
                      boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.15)}`
                    }
                  }
                }}
              />
              
              {/* Suggested Preferences */}
              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ 
                  mt: 2,
                  flexWrap: 'wrap',
                  gap: 1
                }}
              >
                {suggestedPreferences.map((pref) => (
                  <Zoom 
                    key={pref} 
                    in={true} 
                    style={{ transitionDelay: `${suggestedPreferences.indexOf(pref) * 50}ms` }}
                  >
                    <Chip
                      label={pref}
                      onClick={() => addPreference(pref)}
                      sx={{
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        color: theme.palette.primary.main,
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                          transform: 'translateY(-2px)'
                        },
                        cursor: 'pointer'
                      }}
                    />
                  </Zoom>
                ))}
              </Stack>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.25)}`
                }
              }}
            >
              Generate Itinerary
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Fade>
  );
};

export default TripForm;
