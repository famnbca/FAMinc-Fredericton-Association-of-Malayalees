import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Container, Typography, Card } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from './Loading';
import './MissionVision.css';

const MissionVision = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const navigate = useNavigate();
  const [missionVisionData, setMissionVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionVisionData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/missionvission.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMissionVisionData(data.missionVision);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchMissionVisionData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const missionImage = `${process.env.PUBLIC_URL}/images/heroimages/MissionVission-Hero.png`;

  return (
    <Box 
      component="section" 
      id="mission" 
      ref={ref}
      sx={{ 
        py: { xs: 8, md: 12 },
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={{ xs: 5, md: 8 }}>
          {/* Left Column: Text Cards */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 3.5 }}
            >
              <Box>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 800, 
                    letterSpacing: '0.1em',
                    fontSize: '0.85rem' 
                  }}
                >
                  GUIDING PRINCIPLES
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 900, 
                    fontSize: { xs: '2.2rem', sm: '2.6rem', md: '3rem' },
                    letterSpacing: '-0.02em',
                    color: '#0f172a'
                  }}
                >
                  Our Purpose & <Box component="span" sx={{ color: 'primary.main' }}>Vision</Box>
                </Typography>
              </Box>

              {/* Mission Card */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: '1px solid rgba(230, 74, 25, 0.12)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 32px rgba(230, 74, 25, 0.1)',
                    borderColor: 'rgba(230, 74, 25, 0.3)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: 3,
                      backgroundColor: 'rgba(230, 74, 25, 0.1)',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FlagIcon sx={{ fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 800, 
                        color: '#0f172a',
                        mb: 0.5,
                        fontSize: '1.15rem'
                      }}
                    >
                      Our Mission
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        lineHeight: 1.65,
                        fontSize: '0.95rem' 
                      }}
                    >
                      {missionVisionData.mission}
                    </Typography>
                  </Box>
                </Box>
              </Card>

              {/* Vision Card */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: '1px solid rgba(245, 158, 11, 0.15)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 32px rgba(245, 158, 11, 0.12)',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: 3,
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      color: '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 800, 
                        color: '#0f172a',
                        mb: 0.5,
                        fontSize: '1.15rem'
                      }}
                    >
                      Our Vision
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        lineHeight: 1.65,
                        fontSize: '0.95rem' 
                      }}
                    >
                      {missionVisionData.vision}
                    </Typography>
                  </Box>
                </Box>
              </Card>

              <Box sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/aboutus')}
                  sx={{
                    px: 4,
                    py: 1.3,
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                    boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                    }
                  }}
                >
                  Learn More About Us
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Illustration with subtle glow */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box
                component="img"
                src={missionImage}
                alt="Mission and Vision Kathakali"
                sx={{
                  width: '100%',
                  maxWidth: '480px',
                  height: 'auto',
                  display: 'block',
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.04) drop-shadow(0 15px 25px rgba(0,0,0,0.06))'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionVision;
