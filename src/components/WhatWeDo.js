import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileDownload, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { Container, Button, Typography, Box, Card } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const iconMap = {
  FaFileDownload: <FaFileDownload />,
  FaFacebook: <FaFacebook />,
  FaWhatsapp: <FaWhatsapp />
};

// Custom modern gradients matching brand themes
const gradientMap = {
  '#d9534f': 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
  '#3b5998': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  '#25D366': 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
};

const WhatWeDo = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config/socialmedialinks.json`)
      .then(response => response.json())
      .then(data => setCardData(data.cardData || []))
      .catch(error => console.error('Error fetching social media links config:', error));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      } 
    }
  };

  if (cardData.length === 0) return null;

  return (
    <Container maxWidth="sm" sx={{ px: 0 }}>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          width: '100%',
        }}
      >
        {cardData.map((card) => {
          const cardGradient = gradientMap[card.color] || card.color;

          return (
            <Box
              key={card.id}
              component={motion.div}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: { xs: 2.5, sm: 3 },
                  background: cardGradient,
                  borderRadius: 4,
                  boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  overflow: 'hidden',
                  color: '#ffffff',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.2)',
                    '& .brand-icon-wrapper': {
                      transform: 'scale(1.08)',
                      opacity: 0.95
                    },
                    '& .btn-arrow': {
                      transform: 'translateX(3px)',
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  {/* Left Content Area */}
                  <Box sx={{ flex: 1, textAlign: 'left', pr: 2 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        mb: 0.75,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.015em',
                        color: '#ffffff',
                      }}
                    >
                      {card.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.88rem', 
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.92)',
                        maxWidth: '320px',
                        mb: 2
                      }}
                    >
                      {card.description}
                    </Typography>

                    {card.link && (
                      <Button
                        variant="contained"
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          backgroundColor: '#ffffff',
                          color: card.color === '#d9534f' ? '#e64a19' : card.color === '#3b5998' ? '#1d4ed8' : '#059669',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          borderRadius: '25px',
                          px: 2.8,
                          py: 0.8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          textTransform: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          transition: 'all 0.25s ease',
                          '&:hover': {
                            backgroundColor: '#ffffff',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                          }
                        }}
                      >
                        <span>Connect</span>
                        <ChevronRightIcon 
                          className="btn-arrow"
                          sx={{ 
                            fontSize: '1.1rem', 
                            transition: 'transform 0.2s ease' 
                          }} 
                        />
                      </Button>
                    )}
                  </Box>

                  {/* Right Icon Area */}
                  <Box 
                    className="brand-icon-wrapper"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.85)', 
                      fontSize: { xs: '3.5rem', sm: '4.2rem' }, 
                      display: 'flex', 
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    {iconMap[card.icon]}
                  </Box>
                </Box>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default WhatWeDo;
