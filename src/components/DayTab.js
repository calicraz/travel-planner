import React, { useState } from 'react';
import { 
  Typography, Box, Card, CardContent, Grow, IconButton, Button,
  Stack, Collapse, useMediaQuery, Avatar, alpha, useTheme,
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const getActivityImage = (tags = []) => {
  const tagString = tags.join(',').toLowerCase();
  if (tagString.includes('food')) return 'https://source.unsplash.com/featured/?food,restaurant';
  if (tagString.includes('museum')) return 'https://source.unsplash.com/featured/?museum,art';
  if (tagString.includes('beach')) return 'https://source.unsplash.com/featured/?beach,ocean';
  if (tagString.includes('nature')) return 'https://source.unsplash.com/featured/?nature,hiking';
  if (tagString.includes('shopping')) return 'https://source.unsplash.com/featured/?shopping,boutique';
  if (tagString.includes('nightlife')) return 'https://source.unsplash.com/featured/?bar,nightlife';
  return 'https://source.unsplash.com/featured/?travel,tourism';
};

const getTimePeriod = (time) => {
  if (time.includes('AM')) return { label: 'Morning', color: '#FFC107' };
  const hour = parseInt(time.split(':')[0]);
  if (hour < 6) return { label: 'Afternoon', color: '#FF9800' };
  return { label: 'Evening', color: '#5C6BC0' };
};

const ActivityCard = ({ activity, index, isLast }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timePeriod = getTimePeriod(activity.time);

  return (
    <Grow in={true} timeout={300 + (index * 150)}>
      <Box sx={{ 
        position: 'relative', 
        mb: isLast ? 0 : 4,
        '&::after': !isLast ? {
          content: '""',
          position: 'absolute',
          left: { xs: 20, sm: 28 },
          top: '100%',
          bottom: '-20px',
          width: 2,
          background: `linear-gradient(to bottom, ${alpha(timePeriod.color, 0.7)}, ${alpha(timePeriod.color, 0.1)})`,
          zIndex: 0
        } : {}
      }}>
        <Avatar sx={{
          position: 'absolute',
          left: { xs: 0, sm: 8 },
          top: { xs: 16, sm: 24 },
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
          bgcolor: alpha(timePeriod.color, 0.15),
          border: `2px solid ${timePeriod.color}`,
          color: timePeriod.color,
          fontWeight: 'bold',
          zIndex: 2,
          boxShadow: `0 4px 12px ${alpha(timePeriod.color, 0.25)}`
        }}>
          {activity.time.split(':')[0]}
        </Avatar>

        <Card
          elevation={0}
          sx={{
            ml: { xs: 5, sm: 8 },
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.1),
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 28px ${alpha(timePeriod.color, 0.2)}`
            }
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {(!isMobile || expanded) && (
            <Box sx={{ height: 150, width: '100%', position: 'relative' }}>
              <Box sx={{ 
                backgroundImage: `url(${getActivityImage(activity.tags)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.05)' : 'scale(1)'
              }} />
              <IconButton size="small" sx={{ 
                position: 'absolute',
                right: 8,
                bottom: 8,
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)'
              }}>
                <PhotoCameraIcon sx={{ fontSize: 16, color: 'white' }} />
              </IconButton>
            </Box>
          )}

          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {activity.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ fontSize: 16, color: timePeriod.color }} />
                  <Typography variant="body2" sx={{ color: timePeriod.color, fontWeight: 500 }}>
                    {activity.time}
                  </Typography>
                </Stack>
              </Box>
              <IconButton size="small">
                <BookmarkBorderIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Collapse in={!isMobile || expanded}>
              <Typography variant="body2" sx={{ 
                mt: 2,
                color: alpha(theme.palette.text.primary, 0.8)
              }}>
                {activity.description}
              </Typography>
            </Collapse>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PlaceIcon sx={{ fontSize: 16, mr: 0.5, color: theme.palette.text.secondary }} />
                <Typography variant="body2" color="text.secondary">
                  {activity.location}
                </Typography>
              </Box>
              <Button
                startIcon={<DirectionsIcon />}
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main }
                }}
              >
                Directions
              </Button>
            </Stack>

            {isMobile && (
              <IconButton
                size="small"
                onClick={() => setExpanded(!expanded)}
                sx={{ 
                  display: { sm: 'none' },
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}

            {activity.tags && (
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                {activity.tags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: alpha(timePeriod.color, 0.1),
                      color: timePeriod.color,
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: alpha(timePeriod.color, 0.2),
                      }
                    }}
                  />
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>
    </Grow>
  );
};

const DayTab = ({ day, activities }) => {
  return (
    <Box>
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          activity={activity}
          index={index}
          isLast={index === activities.length - 1}
        />
      ))}
    </Box>
  );
};

export default DayTab;
