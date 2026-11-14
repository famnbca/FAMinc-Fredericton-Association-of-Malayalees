import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Snackbar, Alert, IconButton, Tooltip, Paper, CircularProgress } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Email, LocationOn } from '@mui/icons-material';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';

const iconMap = {
  Facebook: <Facebook fontSize="medium" />,
  Instagram: <Instagram fontSize="medium" />,
  WhatsApp: <WhatsApp fontSize="medium" />,
  Email: <Email fontSize="medium" />
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const ContactUs = () => {
  const logofam = `${process.env.PUBLIC_URL}/images/logofam.avif`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [socialLinks, setSocialLinks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config/socialmedialinks.json`)
      .then(response => response.json())
      .then(data => setSocialLinks(data.socialLinks || []))
      .catch(error => console.error('Error fetching social media links:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData })
      });

      if (response.ok) {
        setAlertSeverity('success');
        setResponseMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Netlify form submission failed');
      }
    } catch (error) {
      setAlertSeverity('error');
      setResponseMessage('There was a problem sending your message. Please reach out to info@famnb.ca directly.');
    } finally {
      setSubmitting(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Fredericton Association of Malayalees',
    'description': 'Contact page for inquiries about FAM membership, events, sponsorship, and newcomer settlement support in Fredericton, New Brunswick.',
    'url': 'https://famnb.ca/contactus',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Fredericton Association of Malayalees',
      'email': 'info@famnb.ca',
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
        pageTitle="Contact Us" 
        description="Get in touch with the Fredericton Association of Malayalees (FAM) in New Brunswick, Canada. Send inquiries regarding membership, cultural events, or newcomer support." 
        structuredData={[contactSchema]}
      />

      <Box sx={{ pt: { xs: 10, sm: 12, md: 14 }, pb: { xs: 8, md: 12 }, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs />
          </Box>

          {/* Heading Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: '0.12em',
                fontSize: '0.85rem'
              }}
            >
              WE'D LOVE TO HEAR FROM YOU
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
              Contact <Box component="span" sx={{ color: 'primary.main' }}>Us</Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.6 }}
            >
              Have a question about membership, upcoming events, or newcomer settlement? Send us a message or reach out across our social channels.
            </Typography>
          </Box>

          <Grid container spacing={5} alignItems="stretch">
            {/* Left Column: Organization Info Card */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, sm: 5 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
                  textAlign: 'center'
                }}
              >
                <Box>
                  <Box
                    component="img"
                    src={logofam}
                    alt="FAM Logo"
                    sx={{
                      width: 110,
                      height: 110,
                      borderRadius: '50%',
                      border: '3px solid #e64a19',
                      boxShadow: '0 4px 14px rgba(230, 74, 25, 0.2)',
                      mb: 2,
                      objectFit: 'cover'
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                    Fredericton Association of Malayalees
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
                    A registered non-profit organization fostering Kerala culture and community unity in New Brunswick.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Email sx={{ color: 'primary.main', fontSize: 24 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          Email Address
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                          info@famnb.ca
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LocationOn sx={{ color: 'primary.main', fontSize: 24 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          Location
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                          Fredericton, New Brunswick, Canada
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ pt: 3, borderTop: '1px solid #f1f5f9' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 1.5 }}>
                    Connect with our channels
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={1.5}>
                    {socialLinks.map((link) => (
                      <Tooltip title={link.platform} key={link.id}>
                        <IconButton
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            backgroundColor: 'rgba(230, 74, 25, 0.06)',
                            color: link.color || '#e64a19',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: '#e64a19',
                              color: '#ffffff',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          {iconMap[link.icon] || <Email />}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Right Column: Contact Form Card */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, sm: 5 },
                  borderRadius: 4,
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
                  textAlign: 'left'
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, fontSize: '1.6rem' }}>
                  Send a Message
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
                  Fill out the form below and a FAM volunteer or representative will respond promptly.
                </Typography>
                
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field" 
                  onSubmit={handleSubmit}
                >
                  {/* Hidden fields required for Netlify Form processing */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p style={{ display: 'none' }}>
                    <label>
                      Don’t fill this out if you're human: <input name="bot-field" onChange={handleChange} />
                    </label>
                  </p>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField 
                        label="Full Name" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={submitting}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        label="Email Address" 
                        type="email" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={submitting}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        label="Your Message" 
                        variant="outlined" 
                        multiline 
                        rows={5} 
                        fullWidth 
                        required 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={submitting}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3
                          }
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={submitting}
                    sx={{ 
                      mt: 3, 
                      py: 1.4, 
                      px: 4,
                      fontWeight: 700, 
                      fontSize: '0.95rem',
                      borderRadius: '30px',
                      background: 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)',
                      boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                        boxShadow: '0 6px 20px rgba(230, 74, 25, 0.4)',
                      }
                    }}
                    fullWidth
                  >
                    {submitting ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending Message...</span>
                      </Box>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>

          {/* Map */}
          <Box sx={{ mt: 8, borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17914.883066472462!2d-66.65849926606492!3d45.96358997910885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca43ae1f0f3b7a5%3A0x32a4958fdbb5a905!2sFredericton%2C%20NB!5e0!3m2!1sen!2sca!4v1605295357034!5m2!1sen!2sca"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              style={{ border: 0, display: 'block' }}
              title="Fredericton Association of Malayalees Location Map"
            />
          </Box>
        </Container>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%', borderRadius: 3, fontWeight: 600 }}>
            {responseMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ContactUs;
