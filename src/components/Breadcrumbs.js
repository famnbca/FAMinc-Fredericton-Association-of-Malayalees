import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const nameMap = {
  aboutus: 'About Us',
  events: 'Events & Celebrations',
  usefullinks: 'Useful Links',
  contactus: 'Contact Us',
  joinus: 'Membership',
  gallery: 'Gallery',
  savewayanad: 'Stand With Wayanad'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length === 0) {
    return null;
  }

  const formatBreadcrumb = (value) => {
    if (nameMap[value.toLowerCase()]) {
      return nameMap[value.toLowerCase()];
    }
    return value.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Box 
      component="nav" 
      aria-label="breadcrumb navigation"
      sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        mb: { xs: 2.5, md: 3 },
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          py: 0.6,
          px: 1.8,
          borderRadius: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.07)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        }}
      >
        <MUIBreadcrumbs
          separator={
            <NavigateNextRoundedIcon 
              sx={{ fontSize: '1rem', color: '#94a3b8', mx: -0.2 }} 
            />
          }
          aria-label="breadcrumb"
          sx={{
            fontSize: '0.82rem',
            '& .MuiBreadcrumbs-ol': {
              alignItems: 'center',
              flexWrap: 'wrap',
            }
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              color: '#64748b',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#e64a19',
                textDecoration: 'none',
              }
            }}
          >
            <HomeRoundedIcon sx={{ fontSize: '1.05rem', mb: '1px' }} />
            Home
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const breadcrumb = formatBreadcrumb(value);

            return isLast ? (
              <Typography
                key={to}
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#e64a19',
                  letterSpacing: '0.01em',
                }}
              >
                {breadcrumb}
              </Typography>
            ) : (
              <Link
                key={to}
                component={RouterLink}
                to={to}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#64748b',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#e64a19',
                    textDecoration: 'none',
                  }
                }}
              >
                {breadcrumb}
              </Link>
            );
          })}
        </MUIBreadcrumbs>
      </Box>
    </Box>
  );
};

export default Breadcrumbs;
