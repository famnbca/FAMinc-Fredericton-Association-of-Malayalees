import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { PhotoCamera, CalendarMonth, WhatsApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import Loading from '../Loading';
import HelmetWrapper from '../HelmetWrapper';
import "./Gallery.css";

const Gallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappUrl, setWhatsappUrl] = useState('https://chat.whatsapp.com/IXV3beMoynf4ud2ekBUqlM');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Fetch social links to get live WhatsApp URL
        fetch(`${process.env.PUBLIC_URL}/config/socialmedialinks.json`)
          .then(res => res.json())
          .then(data => {
            const wa = (data.socialLinks || []).find(l => l.platform?.toLowerCase() === 'whatsapp') 
              || (data.cardData || []).find(c => c.title?.toLowerCase().includes('whatsapp'));
            if (wa && (wa.url || wa.link)) {
              setWhatsappUrl(wa.url || wa.link);
            }
          })
          .catch(() => {});

        // Fetch gallery config (supports both gallery.json object or array)
        let imageList = [];
        try {
          const resConfig = await fetch(`${process.env.PUBLIC_URL}/config/gallery.json`);
          if (resConfig.ok) {
            const data = await resConfig.json();
            imageList = Array.isArray(data) ? data : (data.images || []);
          }
        } catch (e) {
          // fallback to legacy galleryimages.json
          const resLegacy = await fetch(`${process.env.PUBLIC_URL}/images/galleryimages/galleryimages.json`);
          if (resLegacy.ok) {
            imageList = await resLegacy.json();
          }
        }

        if (Array.isArray(imageList) && imageList.length > 0) {
          const formatted = imageList.map(item => {
            if (typeof item === 'string') {
              const src = item.startsWith('http') || item.startsWith('/') 
                ? item 
                : `${process.env.PUBLIC_URL}/images/galleryimages/${item}`;
              return {
                original: src,
                thumbnail: src,
                description: 'FAM Community Moment'
              };
            }
            const src = item.image?.startsWith('http') || item.image?.startsWith('/')
              ? item.image
              : `${process.env.PUBLIC_URL}/images/events/${item.image || ''}`;
            return {
              original: src,
              thumbnail: src,
              description: item.title || item.caption || 'FAM Community Celebration'
            };
          });
          setImages(formatted);
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error('Error fetching gallery images', err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <Box sx={{ pt: 16, pb: 10, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading loading={true} />
        <HelmetWrapper 
          pageTitle="Gallery" 
          description="Explore photos and memorable moments from festivals and cultural events hosted by the Fredericton Association of Malayalees in New Brunswick." 
        />
      </Box>
    );
  }

  return (
    <>
      <HelmetWrapper 
        pageTitle="Photo Gallery - Fredericton Association of Malayalees" 
        structuredData={[{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          'name': 'Fredericton Association of Malayalees Photo Gallery',
          'url': 'https://famnb.ca/gallery',
          'description': 'Moments and memories from authentic cultural celebrations, Onam festivals, family picnics, and community gatherings in Fredericton, NB.'
        }]} 
        description="Official gallery of the Fredericton Association of Malayalees. Authentic moments from cultural festivals and community gatherings across New Brunswick." 
      />

      <Box sx={{ pt: { xs: 10, sm: 12, md: 14 }, pb: { xs: 8, md: 12 }, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs />
          </Box>

          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: '0.12em',
                fontSize: '0.85rem'
              }}
            >
              COMMUNITY MEMORIES
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                letterSpacing: '-0.02em',
                mt: 0.5,
                mb: 1.5,
                color: '#0f172a'
              }}
            >
              Photo <Box component="span" sx={{ color: 'primary.main' }}>Gallery</Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 620, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.6 }}
            >
              Capturing authentic moments of fellowship, festival celebrations, and family gatherings in Fredericton, New Brunswick.
            </Typography>
          </Box>

          {images.length > 0 ? (
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                p: { xs: 1.5, sm: 3 },
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                '& .image-gallery-slide img': {
                  borderRadius: 3,
                  maxHeight: '600px',
                  objectFit: 'contain',
                  backgroundColor: '#0f172a'
                },
                '& .image-gallery-thumbnail img': {
                  borderRadius: 2
                },
                '& .image-gallery-thumbnail.active, & .image-gallery-thumbnail:hover': {
                  border: '3px solid #e64a19'
                }
              }}
            >
              <ImageGallery
                items={images}
                showThumbnails={true}
                thumbnailPosition='bottom'
                infinite={true}
                autoPlay={true}
                slideInterval={5000}
                lazyLoad={true}
                showPlayButton={true}
                showFullscreenButton={true}
              />
            </Paper>
          ) : (
            /* Modern, Authentic Empty State when Gallery is under curation */
            <Paper
              elevation={0}
              sx={{
                maxWidth: 720,
                mx: 'auto',
                p: { xs: 4, sm: 6 },
                textAlign: 'center',
                borderRadius: 4,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 12px 35px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative background glow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -80,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 250,
                  height: 250,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(230, 74, 25, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
                  pointerEvents: 'none'
                }}
              />

              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(230, 74, 25, 0.08)',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <PhotoCamera sx={{ fontSize: 40 }} />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5 }}>
                Memories Under Curation
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 540, mx: 'auto', lineHeight: 1.7, mb: 4 }}>
                Our media team is compiling verified, high-resolution photographs from our signature Onam feasts, cultural performances, picnics, and community gatherings. Once reviewed, authentic photo albums will be published here.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<CalendarMonth />}
                  onClick={() => navigate('/events')}
                  sx={{
                    py: 1.3,
                    px: 3.5,
                    borderRadius: '30px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                    boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                    }
                  }}
                >
                  Explore Upcoming Events
                </Button>

                <Button
                  variant="outlined"
                  component="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<WhatsApp sx={{ color: '#25D366' }} />}
                  sx={{
                    py: 1.3,
                    px: 3.5,
                    borderRadius: '30px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    borderColor: 'rgba(0,0,0,0.15)',
                    '&:hover': {
                      borderColor: '#25D366',
                      backgroundColor: 'rgba(37, 211, 102, 0.05)'
                    }
                  }}
                >
                  Join Community WhatsApp
                </Button>
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Gallery;
