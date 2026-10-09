import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Typography, CircularProgress, Button, Container, Paper } from '@mui/material';
import { FaFacebookF } from 'react-icons/fa';

const FacebookPageEmbed = () => {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const iframeRef = useRef(null);

  const loadFacebookSDK = useCallback(() => {
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v20.0';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
          setLoading(false);
        } else if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
        }
      };
      script.onerror = () => {
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
        }
      };
      document.body.appendChild(script);
    } else if (window.FB) {
      window.FB.XFBML.parse();
      setLoading(false);
    }
  }, [retryCount, maxRetries]);

  useEffect(() => {
    if (retryCount < maxRetries) {
      loadFacebookSDK();
    } else {
      setLoading(false);
    }
  }, [loadFacebookSDK, retryCount, maxRetries]);

  useEffect(() => {
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && retryCount < maxRetries) {
            loadFacebookSDK();
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentIframe = iframeRef.current;
    if (currentIframe) {
      observer.observe(currentIframe);
    }

    return () => {
      if (currentIframe) {
        observer.unobserve(currentIframe);
      }
    };
  }, [loadFacebookSDK, retryCount, maxRetries]);

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              background: 'linear-gradient(135deg, #1877f2 0%, #0d5bbd 100%)',
              py: 4,
              px: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                color: '#ffffff'
              }}
            >
              <FaFacebookF size={28} />
            </Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.6rem', md: '2.2rem' } }}>
              Connect With Us on Facebook
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: '500px', fontSize: '0.95rem' }}>
              Follow our page for the latest community news, photos, announcements, and festival updates!
            </Typography>
          </Box>

          {/* Facebook Embed Area */}
          <Box
            ref={iframeRef}
            sx={{
              width: '100%',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              p: 2,
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 6 }}>
                <CircularProgress sx={{ color: '#1877f2' }} />
                <Typography variant="body2" color="text.secondary">Loading Facebook Feed...</Typography>
              </Box>
            ) : (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                <div
                  className="fb-page"
                  data-href="https://www.facebook.com/profile.php?id=61552104893247"
                  data-tabs="timeline"
                  data-width="500"
                  data-height="480"
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                  style={{ width: '100%', maxWidth: '500px' }}
                >
                  <blockquote
                    cite="https://www.facebook.com/profile.php?id=61552104893247"
                    className="fb-xfbml-parse-ignore"
                  >
                    <a href="https://www.facebook.com/profile.php?id=61552104893247">
                      Fredericton Association of Malayalees - FAM
                    </a>
                  </blockquote>
                </div>
              </Box>
            )}

            <Box sx={{ mt: 3, pb: 1 }}>
              <Button
                variant="contained"
                href="https://www.facebook.com/profile.php?id=61552104893247"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<FaFacebookF />}
                sx={{
                  borderRadius: '30px',
                  backgroundColor: '#1877f2',
                  color: 'white',
                  px: 3.5,
                  py: 1.1,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                  '&:hover': {
                    backgroundColor: '#0d5bbd',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(24, 119, 242, 0.4)',
                  },
                }}
              >
                Visit Facebook Page
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FacebookPageEmbed;
