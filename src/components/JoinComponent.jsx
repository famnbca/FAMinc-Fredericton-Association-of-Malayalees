import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const bgBack = `${process.env.PUBLIC_URL}/images/heroimages/a1.jpg`;

const JoinComponent = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, px: { xs: 2, sm: 3 } }}>
      <Container
        maxWidth="lg"
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          position: 'relative',
          borderRadius: { xs: 4, md: 6 },
          overflow: 'hidden',
          p: { xs: 4, sm: 6, md: 8 },
          textAlign: 'center',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${bgBack})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            transform: 'scale(1.02)',
            transition: 'transform 0.5s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 41, 59, 0.82) 50%, rgba(230, 74, 25, 0.75) 100%)',
            backdropFilter: 'blur(2px)',
            zIndex: 1,
          },
          '&:hover::before': {
            transform: 'scale(1.06)',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '820px', mx: 'auto' }}>
          <Typography
            variant="overline"
            sx={{
              color: '#f59e0b',
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontSize: '0.85rem',
              display: 'inline-block',
              mb: 1
            }}
          >
            BECOME A PART OF OUR FAMILY
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: '#ffffff',
              mb: 2.5,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3.2rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Join the Fredericton Association of Malayalees Today!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'rgba(255, 255, 255, 0.92)',
              fontSize: { xs: '1rem', sm: '1.15rem' },
              lineHeight: 1.7,
              maxWidth: '680px',
              mx: 'auto'
            }}
          >
            Connect with fellow Malayalees, celebrate our vibrant festivals, support community initiatives, and access newcomer support programs across Fredericton and New Brunswick.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate('/joinus')}
              startIcon={<FaUserPlus />}
              sx={{
                background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                color: '#ffffff',
                px: { xs: 3.5, sm: 4.5 },
                py: 1.4,
                borderRadius: '35px',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 6px 20px rgba(230, 74, 25, 0.45)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(230, 74, 25, 0.6)',
                },
              }}
            >
              Join Our Community
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/usefullinks')}
              sx={{
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                borderWidth: '2px',
                px: { xs: 3.5, sm: 4 },
                py: 1.3,
                borderRadius: '35px',
                fontWeight: 700,
                fontSize: '0.95rem',
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                '&:hover': {
                  borderColor: '#ffffff',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  borderWidth: '2px',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Explore Newcomer Links
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinComponent;
