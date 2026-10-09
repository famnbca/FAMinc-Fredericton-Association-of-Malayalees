import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Container,
  Fab,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faCalendarAlt, faEnvelope, faBars, faImages, faUsers, faArrowUp, faLink, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

const pages = [
  { name: 'Home', icon: faHome, path: '/' },
  { name: 'About Us', icon: faInfoCircle, path: '/aboutus' },
  { name: 'Events', icon: faCalendarAlt, path: '/events' },
  { name: 'Gallery', icon: faImages, path: '/gallery' },
  { name: 'Useful Links', icon: faLink, path: '/usefullinks' },
  { name: 'Contact Us', icon: faEnvelope, path: '/contactus' },
];

const logo = `${process.env.PUBLIC_URL}/images/logofam.avif`;

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
    setShowBackToTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setScrolled(window.scrollY > 40);
      window.addEventListener('scroll', handleScroll);
    } else {
      setScrolled(true);
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    }
  };

  const isNavSolid = scrolled || location.pathname !== '/';

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: isNavSolid ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.25)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          color: isNavSolid ? '#0f172a' : '#ffffff',
          width: { xs: '100%', md: isNavSolid ? 'calc(100% - 48px)' : 'calc(100% - 32px)' },
          maxWidth: '1240px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: { xs: 0, md: 16 },
          borderRadius: { xs: 0, md: '50px' },
          boxShadow: isNavSolid 
            ? '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
            : '0 4px 20px rgba(0, 0, 0, 0.15)',
          border: isNavSolid ? '1px solid rgba(230, 74, 25, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 3 } }}>
          <Toolbar disableGutters sx={{ height: { xs: 64, md: 70 }, minHeight: { xs: 64, md: 70 } }}>
            {/* Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <RouterLink 
                to="/" 
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: '12px' }} 
                onClick={handleHomeClick}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="FAM Logo"
                  loading="lazy"
                  sx={{
                    height: { xs: 44, md: 48 },
                    width: { xs: 44, md: 48 },
                    borderRadius: '50%',
                    border: '2px solid #e64a19',
                    boxShadow: '0 2px 8px rgba(230, 74, 25, 0.25)',
                    transition: 'transform 0.3s ease',
                    objectFit: 'cover',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 800,
                      color: isNavSolid ? '#e64a19' : '#ffffff',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      textShadow: isNavSolid ? 'none' : '0 2px 6px rgba(0,0,0,0.4)'
                    }}
                  >
                    FAM NB
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: { xs: 'none', sm: 'block' },
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: isNavSolid ? '#64748b' : 'rgba(255, 255, 255, 0.85)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Fredericton Association of Malayalees
                  </Typography>
                </Box>
              </RouterLink>
            </Box>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {pages.map((page) => {
                const isActive = location.pathname === page.path;
                return (
                  <Button
                    key={page.name}
                    component={RouterLink}
                    to={page.path}
                    onClick={page.path === '/' ? handleHomeClick : undefined}
                    sx={{
                      px: 1.8,
                      py: 0.8,
                      borderRadius: '20px',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive 
                        ? '#e64a19' 
                        : isNavSolid ? '#334155' : 'rgba(255, 255, 255, 0.95)',
                      backgroundColor: isActive 
                        ? (isNavSolid ? 'rgba(230, 74, 25, 0.08)' : 'rgba(255, 255, 255, 0.2)')
                        : 'transparent',
                      textShadow: (!isNavSolid && !isActive) ? '0 1px 3px rgba(0,0,0,0.4)' : 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: isNavSolid ? 'rgba(230, 74, 25, 0.1)' : 'rgba(255, 255, 255, 0.25)',
                        color: '#e64a19',
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                );
              })}

              <Button
                component={RouterLink}
                to="/joinus"
                variant="contained"
                sx={{
                  ml: 1.5,
                  borderRadius: '30px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  px: 2.8,
                  py: 1,
                  background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(230, 74, 25, 0.35)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(230, 74, 25, 0.45)',
                  },
                }}
                startIcon={<FontAwesomeIcon icon={faUsers} />}
              >
                Join Us
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{ 
                display: { md: 'none' }, 
                color: isNavSolid ? '#e64a19' : '#ffffff',
                p: 1
              }}
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </IconButton>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer 
          anchor="right" 
          open={menuOpen} 
          onClose={toggleMenu} 
          sx={{ 
            '& .MuiDrawer-paper': { 
              backgroundColor: '#ffffff', 
              color: '#0f172a', 
              width: 290,
              p: 2.5,
              boxShadow: '-8px 0 30px rgba(0,0,0,0.12)'
            } 
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <img src={logo} alt="FAM Logo" style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #e64a19' }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#e64a19', lineHeight: 1.1 }}>
                  FAM NB
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                  Fredericton, NB
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={toggleMenu} size="small" sx={{ color: '#64748b' }}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Box>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <ListItem key={page.name} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={page.path}
                    onClick={toggleMenu}
                    sx={{
                      borderRadius: 3,
                      py: 1.2,
                      px: 2,
                      backgroundColor: isActive ? 'rgba(230, 74, 25, 0.08)' : 'transparent',
                      color: isActive ? '#e64a19' : '#334155',
                      '&:hover': {
                        backgroundColor: 'rgba(230, 74, 25, 0.12)',
                        color: '#e64a19',
                        '& .MuiListItemIcon-root': { color: '#e64a19' }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? '#e64a19' : '#64748b', minWidth: 38 }}>
                      <FontAwesomeIcon icon={page.icon} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={page.name} 
                      primaryTypographyProps={{ 
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '0.95rem'
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #f1f5f9' }}>
            <Button
              component={RouterLink}
              to="/joinus"
              onClick={toggleMenu}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: '30px',
                py: 1.3,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                boxShadow: '0 4px 12px rgba(230, 74, 25, 0.3)',
              }}
              startIcon={<FontAwesomeIcon icon={faUsers} />}
            >
              Join Our Community
            </Button>
          </Box>
        </Drawer>
      </AppBar>

      {/* Back to top FAB */}
      {showBackToTop && (
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 1000,
            color: 'white',
            background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
            boxShadow: '0 6px 20px rgba(230, 74, 25, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
            },
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Fab>
      )}
    </>
  );
};

export default NavigationBar;
