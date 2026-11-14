import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarsIcon from '@mui/icons-material/Stars';
import { WhatsApp, Groups } from '@mui/icons-material';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';

const iframeSrc =
  'https://www.zeffy.com/ticketing/fredericton-association-of-malayaleesfam-memberships--2025';

const eligibilityPoints = [
  "Committed to furthering the FAM's cultural, community, and social objectives.",
  'Submit a written application or form to the BOD in the prescribed format.',
  'Pay the prescribed yearly membership fees.',
  'Be a resident of Fredericton and adjacent areas in New Brunswick. (Membership is not open to residents of cities or towns which already have separate associations with similar objectives).',
  'The Board of Directors (BOD) has full authority to review and approve membership applications.',
];

const benefits = [
  'Priority access to all signature cultural events & festivals (Onam, Vishu, Christmas, etc.)',
  'Exclusive member discounts on celebration tickets and family events',
  'Access to newcomer settlement assistance, job guidance, and community support network',
  'Active voting rights in association meetings and opportunities for community leadership'
];

const IframeModal = ({ open, onClose, src }) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullScreen
    PaperProps={{
      sx: {
        bgcolor: 'background.paper',
        position: 'relative',
      },
    }}
  >
    <IconButton
      onClick={onClose}
      sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, color: '#0f172a', bgcolor: 'rgba(255,255,255,0.8)' }}
      aria-label="close"
      size="large"
    >
      <CloseIcon />
    </IconButton>

    <Box
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <iframe
        src={src}
        title="Membership Form"
        style={{ width: '100%', height: '100%', border: 'none' }}
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </Box>
  </Dialog>
);

export default function JoinPage() {
  const [agreed, setAgreed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('https://chat.whatsapp.com/IXV3beMoynf4ud2ekBUqlM');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config/socialmedialinks.json`)
      .then(res => res.json())
      .then(data => {
        const wa = (data.socialLinks || []).find(l => l.platform?.toLowerCase() === 'whatsapp')
          || (data.cardData || []).find(c => c.title?.toLowerCase().includes('whatsapp'));
        if (wa && (wa.url || wa.link)) {
          setWhatsappLink(wa.url || wa.link);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenModal = () => {
    if (agreed) {
      setModalOpen(true);
    }
  };
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <HelmetWrapper 
        pageTitle="Membership & Join Us" 
        description="Join the Fredericton Association of Malayalees (FAM) in New Brunswick. Apply for your yearly membership and be a part of the vibrant cultural community."
        structuredData={[{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Join Fredericton Association of Malayalees - Membership',
          'url': 'https://famnb.ca/joinus',
          'description': 'Join the Fredericton Association of Malayalees (FAM) in New Brunswick. Apply for your yearly membership and be a part of the vibrant cultural community.'
        }]}
      />
      <Box sx={{ pt: { xs: 10, sm: 12, md: 14 }, pb: { xs: 8, md: 12 }, minHeight: '100vh' }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs />
          </Box>

          {/* Heading */}
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
              MEMBERSHIP & COMMUNITY REGISTRATION
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                letterSpacing: '-0.02em',
                mt: 0.5,
                mb: 2,
                color: '#0f172a'
              }}
            >
              Join Our <Box component="span" sx={{ color: 'primary.main' }}>Community</Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1.7 }}
            >
              Welcome to the Fredericton Association of Malayalees (FAM)! We are a registered non-profit dedicated to promoting Kerala’s vibrant culture, fostering fellowship, and supporting Malayalees across New Brunswick.
            </Typography>
          </Box>

          {/* Benefits Grid */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4.5 },
              borderRadius: 4,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
              mb: 5
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                fontSize: '1.3rem'
              }}
            >
              <StarsIcon sx={{ color: '#f59e0b', fontSize: '1.6rem' }} /> Membership Benefits
            </Typography>

            <Grid container spacing={2}>
              {benefits.map((benefit, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: 'rgba(230, 74, 25, 0.03)',
                      border: '1px solid rgba(230, 74, 25, 0.08)',
                      height: '100%'
                    }}
                  >
                    <CheckCircleIcon sx={{ color: 'primary.main', fontSize: '1.3rem', mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.5 }}>
                      {benefit}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Eligibility Criteria Box */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4.5 },
              borderRadius: 4,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
              mb: 5
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                mb: 2.5,
                fontSize: '1.3rem'
              }}
            >
              Eligibility & Guidelines
            </Typography>

            <Box
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 3,
                p: 3,
                maxHeight: 250,
                overflowY: 'auto',
                bgcolor: '#f8fafc',
                fontSize: '0.92rem',
                lineHeight: 1.7,
              }}
            >
              <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                {eligibilityPoints.map((point, i) => (
                  <li key={i} style={{ marginBottom: '0.6rem', color: '#334155' }}>
                    {point}
                  </li>
                ))}
              </ol>

              <Typography variant="body2" sx={{ mt: 2, color: '#64748b', fontStyle: 'italic' }}>
                A structured process is followed to ensure decisions are based on clear criteria. For individuals in NB who express interest, a self-declaration may be submitted for board review.
              </Typography>
            </Box>
          </Paper>

          {/* Acceptance and Action Button */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              backgroundColor: '#ffffff',
              border: '1px solid rgba(230, 74, 25, 0.15)',
              boxShadow: '0 10px 30px -5px rgba(230, 74, 25, 0.08)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2.5,
              mb: 5
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': { color: 'primary.main' }
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                  I have read and meet the eligibility criteria above.
                </Typography>
              }
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              disabled={!agreed}
              onClick={handleOpenModal}
              sx={{
                background: agreed 
                    ? 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)'
                  : 'rgba(0,0,0,0.12)',
                color: '#ffffff',
                px: 4,
                py: 1.4,
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '30px',
                whiteSpace: 'nowrap',
                boxShadow: agreed ? '0 4px 14px rgba(230, 74, 25, 0.35)' : 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #d84315 0%, #ac1900 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(230, 74, 25, 0.45)',
                },
              }}
            >
              Open Membership Form
            </Button>
          </Paper>

          {/* Quick WhatsApp Community Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3.5, sm: 4.5 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.06) 0%, rgba(18, 140, 126, 0.03) 100%)',
              border: '1px solid rgba(37, 211, 102, 0.25)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
              boxShadow: '0 10px 30px -5px rgba(37, 211, 102, 0.08)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)'
                }}
              >
                <WhatsApp sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                  Connect On WhatsApp
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480, lineHeight: 1.5 }}>
                  Are you a newcomer in Fredericton or seeking quick community advice, event alerts, and ride shares? Join our official WhatsApp group.
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              component="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Groups />}
              sx={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#ffffff',
                px: 3.5,
                py: 1.3,
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '30px',
                whiteSpace: 'nowrap',
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #20ba5a 0%, #0d6e62 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)'
                }
              }}
            >
              Join WhatsApp Group
            </Button>
          </Paper>

          {/* Fullscreen modal with iframe */}
          <IframeModal open={modalOpen} onClose={handleCloseModal} src={iframeSrc} />
        </Container>
      </Box>
    </>
  );
}
