import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Alert, Box, Card, Chip } from '@mui/material';
import { CalendarToday, ChevronRight, Celebration, OutdoorGrill, CardGiftcard } from '@mui/icons-material';
import Countdown from 'react-countdown';
import moment from 'moment-timezone';
import { useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';
import './UpcomingEvent.css';

const seasonalHighlights = [
  {
    icon: <Celebration sx={{ color: '#e64a19', fontSize: 32 }} />,
    title: 'Onam Celebration',
    season: 'Autumn / September',
    desc: 'Grand traditional Sadhya feast on banana leaves, Maveli reception, Athapookkalam floral art, and cultural dances.',
    action: '/events'
  },
  {
    icon: <OutdoorGrill sx={{ color: '#f59e0b', fontSize: 32 }} />,
    title: 'Annual Summer Picnic',
    season: 'Summer / June-July',
    desc: 'Fun-filled outdoor barbecue, tug-of-war, games for all age groups, and fellowship in Fredericton city parks.',
    action: '/events'
  },
  {
    icon: <CardGiftcard sx={{ color: '#0284c7', fontSize: 32 }} />,
    title: 'Christmas & New Year Gala',
    season: 'Winter / December',
    desc: 'Live musical night, Santa Claus visit, youth performances, festive banquet, and celebrating the new year together.',
    action: '/events'
  }
];

const UpcomingEvent = () => {
  const [updatedEvents, setUpdatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/events.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await response.json();
        const rawEvents = Array.isArray(eventsData) ? eventsData : (eventsData.events || []);
        const upcomingEventsData = rawEvents.filter(event => event.upcomingEvent);
        const updatedEventsData = upcomingEventsData.map((event) => ({
          ...event,
          eventId: event.title.replace(/\s+/g, '').toLowerCase(),
        }));
        setUpdatedEvents(updatedEventsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  const UpcomingBanner = `${process.env.PUBLIC_URL}/images/events/upcoming-banner.png`;

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Alert severity="info" sx={{ borderRadius: 3, fontWeight: 700 }}>
          The event has started!
        </Alert>
      );
    } else {
      const timeUnits = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: seconds }
      ];

      return (
        <Grid container spacing={2}>
          {timeUnits.map((unit, index) => (
            <Grid item xs={3} sm={2.5} md={2} key={index}>
              <Card
                sx={{
                  backgroundColor: 'rgba(230, 74, 25, 0.04)',
                  border: '1px solid rgba(230, 74, 25, 0.1)',
                  borderRadius: 3,
                  textAlign: 'center',
                  py: 1.5,
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'none',
                    boxShadow: 'none',
                    borderColor: 'rgba(230, 74, 25, 0.3)',
                  }
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', fontFamily: "'Outfit', sans-serif" }}>
                  {String(unit.value).padStart(2, '0')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                  {unit.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  if (updatedEvents.length === 0) {
    return (
      <Box component="section" sx={{ py: { xs: 8, md: 11 }, background: 'transparent' }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: '0.12em',
                fontSize: '0.85rem'
              }}
            >
              FESTIVALS & GATHERINGS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                letterSpacing: '-0.02em',
                mt: 0.5,
                mb: 1.5,
                color: '#0f172a'
              }}
            >
              Upcoming & Signature <Box component="span" sx={{ color: 'primary.main' }}>Events</Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: '640px', mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6 }}
            >
              From colorful Onam festivities to summer picnics and winter galas, discover the celebrations bringing our Malayalee community together.
            </Typography>
          </Box>

          {/* Banner Card */}
          <Card
            sx={{
              p: { xs: 3.5, md: 5 },
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              mb: 5,
              textAlign: 'center'
            }}
          >
            <Box sx={{ maxWidth: 700, mx: 'auto' }}>
              <Chip
                label="Community Calendar"
                color="primary"
                sx={{ fontWeight: 800, mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                Next Season Celebrations in the Works!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.7 }}>
                Our executive committee is finalizing dates and venues for our upcoming cultural festivities. Stay connected to get early bird registration and updates.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  component={Link}
                  to="/events"
                  sx={{
                    px: 3.5,
                    py: 1.3,
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(230, 74, 25, 0.25)',
                  }}
                >
                  Explore All Past Events
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/joinus"
                  sx={{
                    px: 3.5,
                    py: 1.3,
                    fontWeight: 700,
                  }}
                >
                  Become a Member for Early Access
                </Button>
              </Box>
            </Box>
          </Card>

          {/* 3 Seasonal Highlights */}
          <Grid container spacing={3.5}>
            {seasonalHighlights.map((item, index) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3.5,
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.06)',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 8px 24px -4px rgba(0,0,0,0.03)',
                    transition: 'all 0.35s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 36px -6px rgba(230, 74, 25, 0.12)',
                      borderColor: 'rgba(230, 74, 25, 0.3)',
                    }
                  }}
                >
                  <Box sx={{ width: 56, height: 56, borderRadius: '16px', backgroundColor: 'rgba(230,74,25,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {item.season}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}>
                    {item.desc}
                  </Typography>
                  <Button
                    component={Link}
                    to={item.action}
                    endIcon={<ChevronRight />}
                    sx={{ alignSelf: 'flex-start', p: 0, fontWeight: 700, color: 'primary.main', '&:hover': { backgroundColor: 'transparent', transform: 'translateX(3px)' } }}
                  >
                    View Celebrations
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  const event = updatedEvents[0]; 
  const { eventId, title, description, date, isOpen, image } = event;
  const eventDate = moment.tz(date, 'UTC');

  const handleRegister = (eventId, isOpen) => {
    if (isOpen) {
      navigate(`/${eventId}`);
    }
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 }, background: 'transparent' }}>
      <Container maxWidth="lg">
        {/* Banner Header Image */}
        <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 6, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)' }}>
          <img src={UpcomingBanner} alt="Upcoming Events" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Box>

        <Card
          sx={{
            background: '#ffffff',
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
          }}
        >
          <Grid container>
            {/* Left side: Image */}
            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                }}
              >
                <Chip
                  label={isOpen ? "Registration Open" : "Coming Soon"}
                  color={isOpen ? "primary" : "default"}
                  sx={{
                    fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(230, 74, 25, 0.2)',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                />
              </Box>
              <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: { xs: 260, md: 360 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Grid>

            {/* Right side: Event Details */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 4, md: 5 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'text.secondary' }}>
                  <CalendarToday sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {eventDate.format('dddd, MMMM D, YYYY')}
                  </Typography>
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                  {title}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.7 }}>
                  {description}
                </Typography>

                {/* Countdown Timer */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="overline" sx={{ display: 'block', fontWeight: 800, color: 'primary.main', mb: 1, letterSpacing: '0.08em' }}>
                    EVENT COUNTDOWN
                  </Typography>
                  <Countdown date={eventDate.toDate()} renderer={countdownRenderer} />
                </Box>

                {/* Registration Button */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    disabled={!isOpen}
                    onClick={() => handleRegister(eventId, isOpen)}
                    sx={{
                      px: 4,
                      py: 1.4,
                      fontWeight: 800,
                      boxShadow: isOpen ? '0 6px 20px rgba(230, 74, 25, 0.35)' : 'none',
                    }}
                  >
                    {isOpen ? 'Register Now' : 'Registration Closed'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/events"
                    sx={{ px: 3, py: 1.4, fontWeight: 700 }}
                  >
                    All Events
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default UpcomingEvent;
