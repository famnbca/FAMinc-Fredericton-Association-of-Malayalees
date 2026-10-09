import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Grid, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const locations = [
  {
    name: "Kerala",
    badge: "God's Own Country",
    subtitle: "Our Homeland & Roots",
    description: "Known for its serene backwaters, palm-lined beaches, vibrant classical art forms, and rich cultural heritage that unites our Malayalee community across the world.",
    image: `${process.env.PUBLIC_URL}/images/heroimages/Kerala-hero.avif`,
    link: "https://www.keralatourism.org/"
  },
  {
    name: "Fredericton",
    badge: "Our Capital City",
    subtitle: "Home Away From Home",
    description: "The capital of New Brunswick, known for its historic beauty, vibrant riverfront, top universities, and warm, welcoming multicultural community.",
    image: `${process.env.PUBLIC_URL}/images/heroimages/Fredericton-Hero.avif`,
    link: "https://tourismnewbrunswick.ca/fredericton"
  },
  {
    name: "New Brunswick",
    badge: "Atlantic Canada",
    subtitle: "Picturesque Province",
    description: "A breathtaking maritime province offering spectacular natural wonders, coastal vistas, friendly communities, and thriving opportunities for newcomers.",
    image: `${process.env.PUBLIC_URL}/images/heroimages/nb.jpg`,
    link: "https://tourismnewbrunswick.ca/"
  },
];

const BacklinkInfo = () => {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, background: 'transparent' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontSize: '0.85rem'
            }}
          >
            OUR HERITAGE & OUR HOME
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
            Connecting <Box component="span" sx={{ color: 'primary.main' }}>Kerala</Box> to <Box component="span" sx={{ color: '#0284c7' }}>New Brunswick</Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '650px', mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6 }}
          >
            Bridging cultures, fostering ties, and bringing the warmth of Kerala to the picturesque heart of Atlantic Canada.
          </Typography>
        </Box>

        {/* 3-Column Showcase Cards */}
        <Grid container spacing={4}>
          {locations.map((loc, index) => (
            <Grid item xs={12} md={4} key={loc.name}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                sx={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
                      borderColor: 'rgba(230, 74, 25, 0.25)',
                      '& .card-image': {
                        transform: 'scale(1.08)'
                      }
                    }
                  }}
                >
                  {/* Image Container with Badge */}
                  <Box sx={{ position: 'relative', height: 230, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={loc.image}
                      alt={loc.name}
                      className="card-image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0) 50%)'
                      }}
                    />
                    <Chip
                      label={loc.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 12, left: 16, display: 'flex', alignItems: 'center', gap: 0.8, color: '#ffffff' }}>
                      <LocationOnIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                        {loc.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 1, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                        {loc.subtitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, fontSize: '0.95rem' }}>
                        {loc.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                      <Button
                        variant="outlined"
                        href={loc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<LaunchIcon sx={{ fontSize: '1rem !important' }} />}
                        fullWidth
                        sx={{
                          borderRadius: '25px',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          borderColor: 'rgba(0,0,0,0.12)',
                          color: '#0f172a',
                          py: 1,
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'rgba(230, 74, 25, 0.04)',
                            color: 'primary.main'
                          }
                        }}
                      >
                        Explore More
                      </Button>
                    </Box>
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

export default BacklinkInfo;
