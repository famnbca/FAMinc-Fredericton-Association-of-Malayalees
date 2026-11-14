import React from 'react';
import { Container, Grid, Box, Typography, Card, CardContent } from '@mui/material';
import { Groups, CalendarMonth, Handshake, VolunteerActivism } from '@mui/icons-material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: <Groups sx={{ color: '#e64a19', fontSize: 38 }} />,
    value: 800,
    suffix: '+',
    label: 'Community Members',
    description: 'A growing family of Malayalees and friends in Fredericton and across New Brunswick.'
  },
  {
    icon: <CalendarMonth sx={{ color: '#f59e0b', fontSize: 38 }} />,
    value: 15,
    suffix: '+',
    label: 'Annual Cultural Events',
    description: 'Celebrating Onam, Vishu, Christmas Gala, sports tournaments, and family picnics.'
  },
  {
    icon: <Handshake sx={{ color: '#0284c7', fontSize: 38 }} />,
    value: 5,
    suffix: '+',
    label: 'Settlement Programs',
    description: 'Airport reception, housing assistance, and career guidance for newcomers.'
  },
  {
    icon: <VolunteerActivism sx={{ color: '#10b981', fontSize: 38 }} />,
    value: 100,
    suffix: '%',
    label: 'Volunteer-Run Non-Profit',
    description: 'Powered 100% by passionate volunteers dedicated to community service.'
  }
];

const CommunityImpact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  return (
    <Box 
      component="section"
      id="impact"
      ref={ref} 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        position: 'relative',
        background: 'transparent'
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontSize: '0.85rem'
            }}
          >
            OUR COLLECTIVE STRENGTH
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
            Our Community at a <Box component="span" sx={{ color: '#e64a19' }}>Glance</Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '640px', mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6 }}
          >
            Empowering, celebrating, and bridging Kerala traditions with the warm multicultural spirit of Atlantic Canada.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3.5}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                sx={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: { xs: 3, sm: 3.5 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: 4,
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #e64a19 0%, #ffb300 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px -10px rgba(230, 74, 25, 0.15)',
                      borderColor: 'rgba(230, 74, 25, 0.25)',
                      '&::before': {
                        opacity: 1,
                      },
                      '& .icon-bubble': {
                        transform: 'scale(1.1) rotate(5deg)',
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 0, width: '100%', '&:last-child': { pb: 0 } }}>
                    <Box 
                      className="icon-bubble"
                      sx={{ 
                        mb: 2.5, 
                        width: 70, 
                        height: 70, 
                        borderRadius: '20px', 
                        backgroundColor: 'rgba(230, 74, 25, 0.07)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mx: 'auto',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: '#0f172a',
                        mb: 0.5,
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: { xs: '2.5rem', md: '3rem' }
                      }}
                    >
                      {inView ? (
                        <CountUp start={0} end={stat.value} duration={2.2} />
                      ) : (
                        '0'
                      )}
                      <Box component="span" sx={{ color: 'primary.main' }}>
                        {stat.suffix}
                      </Box>
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        mb: 1.5,
                        fontSize: '1.05rem',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6, fontSize: '0.9rem' }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CommunityImpact;
