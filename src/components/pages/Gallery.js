import React, { useState, useEffect, useCallback } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Container, Box, Typography, Paper, Alert } from '@mui/material';
import Breadcrumbs from '../Breadcrumbs';
import Loading from '../Loading';
import HelmetWrapper from '../HelmetWrapper';
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/images/galleryimages/galleryimages.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const imageList = await response.json();
        if (imageList.length === 0) {
          setError('Gallery will be updated soon with latest event photos.');
          return;
        }
        const imageObjects = imageList.map(image => ({
          original: `${process.env.PUBLIC_URL}/images/galleryimages/${image}`,
          thumbnail: `${process.env.PUBLIC_URL}/images/galleryimages/${image}`,
          key: image,
          description: 'FAM Community Event'
        }));
        setImages(imageObjects);
      } catch (error) {
        console.error('Error fetching images', error);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = useCallback(() => {
    // image loaded successfully
  }, []);

  if (loading) {
    return (
      <Box sx={{ pt: 16, pb: 10, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading loading={true} />
        <HelmetWrapper 
          pageTitle="Gallery" 
          description="Explore photos and memorable moments from festivals, celebrations, and events hosted by the Fredericton Association of Malayalees in Canada." 
        />
      </Box>
    );
  }

  return (
    <>
      <HelmetWrapper 
        pageTitle="Gallery - Fredericton Association of Malayalees" 
        description="Explore images and videos from events hosted by the Fredericton Association of Malayalees in Canada. Stay connected with our community through our vibrant gallery." 
      />
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 8, md: 12 }, minHeight: '100vh' }}>
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
              MEMORIES & CELEBRATIONS
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
              Our <Box component="span" sx={{ color: 'primary.main' }}>Gallery</Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.6 }}
            >
              Highlights and memorable moments from our Onam feasts, cultural programs, sports tournaments, and community gatherings.
            </Typography>
          </Box>

          {error ? (
            <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto', borderRadius: 3, fontWeight: 600 }}>
              {error}
            </Alert>
          ) : (
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
                onImageLoad={handleImageLoad}
                lazyLoad={true}
                showPlayButton={true}
                showFullscreenButton={true}
              />
            </Paper>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Gallery;
