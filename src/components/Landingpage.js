import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SparklesIcon from '@mui/icons-material/AutoAwesome';

const slides = [
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Fredericton_Sunset_2021.avif`,
    tag: 'Registered Non-Profit Community in NB',
    welcome: 'Welcome to FAM',
    highlight: 'Fredericton Malayalees',
    description: 'Fredericton Association of Malayalees (FAM) is the official cultural home and support network connecting Malayalees and the Indian diaspora across New Brunswick, Canada.',
    primaryBtn: { text: 'Discover Our Story', action: '#about' },
    secondaryBtn: { text: 'About FAM', action: '/aboutus' }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Kerala-hero.avif`,
    tag: 'Rich Culture & Festivities',
    welcome: 'Celebrate Kerala Festivals',
    highlight: 'Traditions in Atlantic Canada',
    description: 'Experience the magic of Onam Sadhya, Vishu celebrations, Christmas Galas, traditional arts, games, and cultural performances right here in Fredericton.',
    primaryBtn: { text: 'Upcoming Events', action: '/events' },
    secondaryBtn: { text: 'View Gallery', action: '/gallery' }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/nb.jpg`,
    tag: 'Thriving Multicultural Fellowship',
    welcome: 'Be Part of Our Family',
    highlight: 'Join FAM Community Today',
    description: 'Whether you are a newcomer student, a working professional, or settling with family in Fredericton, our warm community welcomes you with open arms.',
    primaryBtn: { text: 'Join FAM Today', action: '/joinus' },
    secondaryBtn: { text: 'Newcomer Resources', action: '/usefullinks' }
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(handleNext, 6500);
    return () => clearInterval(timer);
  }, [handleNext, isHovered]);

  const handlePrimaryButtonClick = (action) => {
    if (action.startsWith('#')) {
      const element = document.getElementById(action.substring(1)) || document.querySelector(action);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(action);
    }
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '84vh', sm: '86vh', md: '90vh' },
        minHeight: { xs: '600px', sm: '640px', md: '700px' },
        overflow: 'hidden',
        backgroundColor: '#0a0d14',
      }}
    >
      {/* Slides transition container */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <Box
          key={current}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Background Image with Ken Burns zoom effect */}
          <Box
            component={motion.div}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 7, ease: 'linear' }}
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Premium Multi-Layer Gradient Overlays */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 30%, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.78) 70%, rgba(10, 13, 20, 0.95) 100%)',
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '35%',
              background: 'linear-gradient(to top, rgba(10, 13, 20, 0.9) 0%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {/* Content Wrapper */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
              px: { xs: 2.5, sm: 6, md: 12 },
              pt: { xs: 8, md: 4 },
              pb: { xs: 10, md: 12 },
            }}
          >
            {/* Top Glowing Glass Tag */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{ mb: 2 }}
            >
              <Chip
                icon={<SparklesIcon sx={{ fontSize: '16px !important', color: '#ffb300 !important' }} />}
                label={slides[current].tag}
                sx={{
                  py: 2,
                  px: 1.5,
                  borderRadius: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  letterSpacing: '0.04em',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                }}
              />
            </Box>

            {/* Slide Title */}
            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              variant="h1"
              sx={{
                fontSize: { xs: '2.4rem', sm: '3.6rem', md: '4.6rem' },
                fontWeight: 900,
                lineHeight: 1.12,
                mb: 1.5,
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                maxWidth: '960px',
              }}
            >
              {slides[current].welcome}
            </Typography>

            {/* Colored Accent Sub-heading */}
            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.1rem' },
                fontWeight: 800,
                mb: 2.5,
                background: 'linear-gradient(135deg, #ff7d47 0%, #ffb300 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 15px rgba(230, 74, 25, 0.3)',
                letterSpacing: '-0.01em',
              }}
            >
              {slides[current].highlight}
            </Typography>

            {/* Slide Description */}
            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              variant="body1"
              sx={{
                fontSize: { xs: '0.98rem', sm: '1.2rem', md: '1.3rem' },
                maxWidth: '780px',
                mb: 4.5,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
                color: 'rgba(255, 255, 255, 0.92)',
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              {slides[current].description}
            </Typography>

            {/* Button Group */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                width: { xs: '100%', sm: 'auto' },
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                onClick={() => handlePrimaryButtonClick(slides[current].primaryBtn.action)}
                sx={{
                  py: 1.6,
                  px: 4.5,
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  borderRadius: '35px',
                  background: 'linear-gradient(135deg, #e64a19 0%, #d84315 100%)',
                  boxShadow: '0 8px 25px rgba(230, 74, 25, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f4511e 0%, #bf360c 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 30px rgba(230, 74, 25, 0.6)',
                  },
                }}
              >
                {slides[current].primaryBtn.text}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(slides[current].secondaryBtn.action)}
                sx={{
                  py: 1.6,
                  px: 4.5,
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  borderRadius: '35px',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderWidth: '2px',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: '2px',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                {slides[current].secondaryBtn.text}
              </Button>
            </Box>
          </Box>
        </Box>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: { xs: 10, sm: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.85)',
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          '&:hover': {
            color: '#fff',
            backgroundColor: 'rgba(230, 74, 25, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-50%) scale(1.08)',
          },
          p: { xs: 1.2, sm: 1.8 },
          transition: 'all 0.25s ease',
        }}
        aria-label="Previous slide"
      >
        <ArrowBackIosNewIcon fontSize="medium" />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: { xs: 10, sm: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.85)',
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          '&:hover': {
            color: '#fff',
            backgroundColor: 'rgba(230, 74, 25, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-50%) scale(1.08)',
          },
          p: { xs: 1.2, sm: 1.8 },
          transition: 'all 0.25s ease',
        }}
        aria-label="Next slide"
      >
        <ArrowForwardIosIcon fontSize="medium" />
      </IconButton>

      {/* Slide Indicators / Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 18 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            sx={{
              width: index === current ? 32 : 10,
              height: 8,
              borderRadius: '4px',
              backgroundColor: index === current ? '#ff7d47' : 'rgba(255, 255, 255, 0.4)',
              boxShadow: index === current ? '0 0 10px rgba(255, 125, 71, 0.8)' : 'none',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: index === current ? '#ff7d47' : 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LandingPage;
