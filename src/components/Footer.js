import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Facebook, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#0d1117', 
        color: '#ffffff', 
        pt: 8, 
        pb: 4, 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Column 1: About Us & Non-Profit Notice */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '2px',
                    bottom: '-8px',
                    left: 0,
                    backgroundColor: '#e64a19',
                  }
                }}
              >
                About FAM NB
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  lineHeight: 1.8,
                  mt: 1,
                  mb: 2
                }}
              >
                Fredericton Association of Malayalees (FAM) is a registered non-profit cultural organization under the New Brunswick Society Act (2021), dedicated to promoting cultural heritage, supporting newcomers, and building unity among Malayalees in Atlantic Canada.
              </Typography>
              <Typography variant="caption" sx={{ color: '#ffb300', fontWeight: 600 }}>
                🌿 Celebrating God&apos;s Own Country in New Brunswick
              </Typography>
            </Box>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '2px',
                    bottom: '-8px',
                    left: 0,
                    backgroundColor: '#e64a19',
                  }
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5, mt: 1 }}>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/aboutus')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { color: '#ff7d47', textDecoration: 'none' }
                  }}
                >
                  About Us
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/events')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { color: '#ff7d47', textDecoration: 'none' }
                  }}
                >
                  Events & Festivals
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/joinus')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { color: '#ff7d47', textDecoration: 'none' }
                  }}
                >
                  Membership
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/usefullinks')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { color: '#ff7d47', textDecoration: 'none' }
                  }}
                >
                  Newcomer Guide
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/gallery')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { color: '#ff7d47', textDecoration: 'none' }
                  }}
                >
                  Photo Gallery
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/contactus')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { color: '#ff7d47', textDecoration: 'none' }
                  }}
                >
                  Contact Us
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Column 3: Contact & Community Connect */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '2px',
                    bottom: '-8px',
                    left: 0,
                    backgroundColor: '#e64a19',
                  }
                }}
              >
                Get In Touch
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Email sx={{ color: '#e64a19', fontSize: 20 }} />
                  <Link 
                    href="mailto:info@famnb.ca" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.85)', 
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      '&:hover': { color: '#ff7d47', textDecoration: 'underline' } 
                    }}
                  >
                    info@famnb.ca
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <LocationOn sx={{ color: '#e64a19', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem' }}>
                    Fredericton, New Brunswick, Canada
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <IconButton 
                    component="a" 
                    href="https://www.facebook.com/profile.php?id=61552104893247" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    sx={{ 
                      color: '#ffffff', 
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      mr: 1,
                      '&:hover': { backgroundColor: '#1877f2', color: '#fff' } 
                    }}
                    aria-label="Facebook Page"
                  >
                    <Facebook />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Footer Bottom */}
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              © {currentYear} Fredericton Association Of Malayalees (FAM NB). All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Non-profit Registration • Fredericton, New Brunswick, Canada
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
