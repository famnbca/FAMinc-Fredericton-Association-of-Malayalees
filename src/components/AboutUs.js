import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Box } from '@mui/material';
import { Slide, Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Loading from './Loading'; 

const AboutUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/aboutus.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
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

  const aboutImage = `${process.env.PUBLIC_URL}/images/heroimages/Aboutus-hero.png`;

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: 'transparent',
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={{ xs: 5, md: 8 }}>
          {/* Left Column: Text info */}
          <Grid item xs={12} md={6}>
            <Slide direction="left" duration={700} triggerOnce={true}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 800, 
                    letterSpacing: '0.12em',
                    fontSize: '0.85rem' 
                  }}
                >
                  ABOUT OUR COMMUNITY
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
                  Malayalee <Box component="span" sx={{ color: 'primary.main' }}>Community</Box>
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.secondary', 
                    mb: 3,
                    fontSize: { xs: '1.15rem', md: '1.3rem' },
                    lineHeight: 1.4
                  }}
                >
                  Celebrating Kerala Culture in Fredericton, New Brunswick, Canada
                </Typography>

                {data.about.description.map((paragraph, index) => (
                  <Typography 
                    key={index} 
                    variant="body1" 
                    sx={{ 
                      color: '#475569', 
                      lineHeight: 1.75, 
                      mb: 2.5,
                      fontSize: '1.02rem' 
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/aboutus')}
                    endIcon={<ChevronRightIcon />}
                    sx={{
                      px: 4,
                      py: 1.3,
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      borderRadius: '30px',
                      background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                      boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                      }
                    }}
                  >
                    Read Full Story
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate('/contactus')}
                    sx={{
                      px: 3.5,
                      py: 1.3,
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      borderRadius: '30px',
                      borderColor: 'rgba(0,0,0,0.15)',
                      color: '#0f172a',
                      '&:hover': {
                        borderColor: '#e64a19',
                        color: '#e64a19',
                        backgroundColor: 'rgba(230, 74, 25, 0.04)',
                      }
                    }}
                  >
                    Get in Touch
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Grid>

          {/* Right Column: Hero Image */}
          <Grid item xs={12} md={6}>
            <Zoom duration={700} triggerOnce={true}>
              <Box 
                sx={{ 
                  borderRadius: 5, 
                  overflow: 'hidden', 
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#ffffff',
                  position: 'relative',
                  p: 1.5
                }}
              >
                <Box 
                  component="img" 
                  src={aboutImage} 
                  alt="FAM Community" 
                  sx={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block',
                    borderRadius: 4,
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    }
                  }} 
                />
              </Box>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
