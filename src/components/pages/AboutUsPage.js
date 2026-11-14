import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, List, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FullWidthImage from '../FullWidthImage';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';
import JoinComponent from '../JoinComponent';
import Loading from '../Loading';

const AboutUsPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [missionVisionData, setMissionVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [aboutResponse, missionVisionResponse] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/config/aboutus.json`),
          fetch(`${process.env.PUBLIC_URL}/config/missionvission.json`)
        ]);

        if (!aboutResponse.ok || !missionVisionResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const aboutData = await aboutResponse.json();
        const missionVisionData = await missionVisionResponse.json();

        setAboutData(aboutData);
        setMissionVisionData(missionVisionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  const aboutImage1 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-1.jpg`;
  const aboutImage2 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-2.jpg`;

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About Fredericton Association of Malayalees',
    'url': 'https://famnb.ca/aboutus',
    'description': 'Learn more about the Fredericton Association of Malayalees (FAM), celebrating Kerala culture, building fellowship, and supporting newcomers in New Brunswick.',
    'mainEntity': {
      '@type': 'NGO',
      'name': 'Fredericton Association of Malayalees',
      'foundingDate': '2021',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Fredericton',
        'addressRegion': 'NB',
        'addressCountry': 'CA'
      }
    }
  };

  return (
    <>
      <HelmetWrapper 
        pageTitle="About Us" 
        description="Learn more about the Fredericton Association of Malayalees (FAM), celebrating Kerala culture, building fellowship, and supporting newcomers in New Brunswick." 
        structuredData={[aboutSchema]}
      />
      <Box sx={{ pt: { xs: 10, sm: 12, md: 14 }, pb: { xs: 6, md: 10 }, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Breadcrumbs />

          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Fade triggerOnce={true} direction="down" duration={500}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  fontSize: '0.85rem'
                }}
              >
                OUR STORY & HERITAGE
              </Typography>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 900, 
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                  mt: 0.5,
                  mb: 1.5,
                  color: '#0f172a'
                }}
              >
                About <Box component="span" sx={{ color: 'primary.main' }}>Fredericton Association of Malayalees</Box>
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 680, mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6 }}
              >
                Preserving cultural heritage, fostering community solidarity, and extending a warm helping hand to Malayalees and newcomers across Fredericton and New Brunswick.
              </Typography>
            </Fade>
          </Box>

          <Grid container spacing={6} alignItems="center">
            {/* Description & Image 1 */}
            <Grid item xs={12} md={6}>
              <Fade triggerOnce={true} direction="left" duration={500}>
                <Box sx={{ textAlign: 'left' }}>
                  {aboutData.about.description.map((paragraph, index) => (
                    <Typography 
                      key={index} 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.8, 
                        mb: 2.5, 
                        color: 'text.secondary',
                        fontSize: '1.05rem' 
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom triggerOnce={true} duration={700}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    overflow: 'hidden', 
                    borderRadius: 4, 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                >
                  <Box 
                    component="img" 
                    src={aboutImage1} 
                    alt="About Us Group" 
                    sx={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </Paper>
              </Zoom>
            </Grid>

            {/* Statistics Bullet Grid */}
            <Grid item xs={12}>
              <Slide triggerOnce={true} direction="up" duration={500}>
                <Grid container spacing={3}>
                  {aboutData.about.statistics.map((stat, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <List disablePadding>
                        {stat.list.map((item, idx) => (
                          <Paper
                            key={idx}
                            elevation={0}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2.2,
                              mb: 2,
                              borderRadius: 3,
                              backgroundColor: '#ffffff',
                              border: '1px solid rgba(230, 74, 25, 0.1)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                              transition: 'transform 0.2s ease',
                              '&:hover': {
                                transform: 'translateX(4px)',
                                borderColor: 'rgba(230, 74, 25, 0.3)'
                              }
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CheckCircleIcon sx={{ color: 'primary.main', fontSize: '1.4rem' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ 
                                fontSize: '1.02rem', 
                                fontWeight: 600, 
                                color: 'text.primary',
                                textAlign: 'left'
                              }}
                            />
                          </Paper>
                        ))}
                      </List>
                    </Grid>
                  ))}
                </Grid>
              </Slide>
            </Grid>

            {/* Activities Section & Image 2 */}
            <Grid item xs={12} md={6}>
              <Zoom triggerOnce={true} duration={700}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    overflow: 'hidden', 
                    borderRadius: 4, 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                >
                  <Box 
                    component="img" 
                    src={aboutImage2} 
                    alt="Activities Group" 
                    sx={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </Paper>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={6}>
              <Fade triggerOnce={true} direction="right" duration={500}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 800, mb: 2.5, letterSpacing: '-0.01em' }}>
                    Fredericton Association of Malayalees
                  </Typography>
                  {aboutData.about.additionalSection.paragraphs.map((paragraph, index) => (
                    <Typography 
                      key={index} 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.8, 
                        mb: 2.5, 
                        color: 'text.secondary',
                        fontSize: '1.05rem' 
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
            </Grid>

            {/* Mission & Vision Cards */}
            <Grid item xs={12} md={6}>
              <Slide triggerOnce={true} direction="left" duration={500}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid rgba(230, 74, 25, 0.15)',
                    backgroundColor: '#ffffff',
                    height: '100%',
                    textAlign: 'left',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 800, 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5 
                    }}
                  >
                    <FlagIcon /> Our Mission
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.025rem' }}>
                    {missionVisionData.missionVision.mission}
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6}>
              <Slide triggerOnce={true} direction="right" duration={500}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    backgroundColor: '#ffffff',
                    height: '100%',
                    textAlign: 'left',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.03)'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#d97706', 
                      fontWeight: 800, 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5 
                    }}
                  >
                    <VisibilityIcon /> Our Vision
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.025rem' }}>
                    {missionVisionData.missionVision.vision}
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

          </Grid>
        </Container>
      </Box>
      <JoinComponent />
      <FullWidthImage />
    </>
  );
};

export default AboutUsPage;
