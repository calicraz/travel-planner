import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Paper,
  Fade,
  useTheme,
  alpha,
  IconButton,
  Stack,
  Button
} from '@mui/material';
import DayTab from './DayTab';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ItineraryDisplay = ({ destination, days, itinerary }) => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getDestinationImage = () => {
    const placeholderImages = [
      'https://source.unsplash.com/featured/?luxury,travel',
      'https://source.unsplash.com/featured/?destination,landmark',
      'https://source.unsplash.com/featured/?travel,scenic'
    ];
    return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  };

  return (
    <Fade in={animateIn} timeout={800}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 0, 
          overflow: 'hidden',
          background: alpha(theme.palette.background.paper, 0.7),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(34, 51, 59, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(34, 51, 59, 0.12)',
          }
        }}
      >
        {/* Header Banner */}
        <Box 
          sx={{ 
            position: 'relative',
            height: { xs: 180, md: 200 },
            backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.primary.dark, 0.7)}, ${alpha(theme.palette.primary.main, 0.8)}), url(${getDestinationImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: { xs: 3, md: 4 },
            color: 'white',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(to top, rgba(234, 224, 213, 0.1), transparent)',
              backdropFilter: 'blur(4px)'
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ fontSize: 22, color: theme.palette.secondary.main, mr: 1 }} />
              <Typography 
                variant="h6" 
                component="span" 
                sx={{ 
                  fontWeight: 600, 
                  letterSpacing: 0.5, 
                  textTransform: 'uppercase',
                  color: theme.palette.secondary.light
                }}
              >
                {destination}
              </Typography>
            </Box>
            
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                mb: 2,
                backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${theme.palette.secondary.light} 100%)`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Your {days}-Day Adventure
            </Typography>
          </Box>
          
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              zIndex: 1
            }}
          >
            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: alpha(theme.palette.background.paper, 0.1),
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: alpha(theme.palette.background.paper, 0.2),
                },
                color: 'white'
              }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: alpha(theme.palette.background.paper, 0.1),
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: alpha(theme.palette.background.paper, 0.2),
                },
                color: 'white'
              }}
            >
              <BookmarkBorderIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ 
                bgcolor: alpha(theme.palette.secondary.main, 0.2),
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  bgcolor: alpha(theme.palette.secondary.main, 0.3),
                },
                color: theme.palette.secondary.light
              }}
            >
              <PictureAsPdfIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Days Tabs */}
        <Box sx={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Tabs 
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: 2,
              '& .MuiTab-root': {
                minWidth: 'auto',
                px: 3,
                py: 2,
                fontWeight: 600,
                color: alpha(theme.palette.text.primary, 0.6),
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: theme.palette.primary.main
                },
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: theme.palette.secondary.main
              }
            }}
          >
            {itinerary.map((_, index) => (
              <Tab 
                key={index} 
                label={`Day ${index + 1}`}
                sx={{
                  borderRadius: '8px 8px 0 0'
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {itinerary.map((dayActivities, index) => (
            <Box
              key={index}
              role="tabpanel"
              hidden={currentTab !== index}
              sx={{
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: currentTab === index ? 1 : 0,
                transform: currentTab === index ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              {currentTab === index && (
                <DayTab day={index + 1} activities={dayActivities} />
              )}
            </Box>
          ))}
        </Box>
      </Paper>
    </Fade>
  );
};

export default ItineraryDisplay;
