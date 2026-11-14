import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Chip,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

export const faqData = [
  {
    category: 'Membership',
    question: 'Who can join the Fredericton Association of Malayalees (FAM)?',
    answer: 'Membership is open to all Malayalees, individuals of Kerala descent, and their families living in Fredericton and adjacent communities across New Brunswick. Anyone committed to supporting and furthering our cultural and community objectives is warmly welcome.'
  },
  {
    category: 'Membership',
    question: 'How do I register for FAM membership and what are the benefits?',
    answer: 'You can register online anytime via our Membership page powered by Zeffy. Benefits include discounted tickets to signature celebrations (Onam, Vishu, Christmas), priority event registration, voting privileges, access to newcomer networks, and participation in community initiatives.'
  },
  {
    category: 'Newcomers',
    question: 'How does FAM help newcomers and international students moving to Fredericton?',
    answer: 'We offer extensive settlement support for newcomers arriving from Kerala and other parts of India/the world. This includes guidance on local housing, healthcare registration, public transit, winter preparedness, job networking, and our curated Newcomer Useful Links directory.'
  },
  {
    category: 'Events',
    question: 'What major cultural festivals and celebrations does FAM organize?',
    answer: 'FAM organizes signature cultural events every year including the grand Onam Celebration & Traditional Sadhya feast, Vishu, Christmas & New Year Gala, Annual Family Summer Picnic, sports tournaments (badminton, cricket, soccer), and charitable drives.'
  },
  {
    category: 'Volunteering',
    question: 'How can I volunteer or contribute to association activities and performances?',
    answer: 'We are 100% volunteer-driven! We welcome volunteers for event coordination, food service, stage management, cultural dance/music performances, youth mentoring, and graphic design. Reach out via our Contact page or message us on Facebook!'
  },
  {
    category: 'General',
    question: 'Is FAM a non-profit organization?',
    answer: 'Yes, Fredericton Association of Malayalees (FAM) is a non-profit, non-political, and non-religious organization officially registered under the New Brunswick Companies Act / Society Act in 2021.'
  }
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState('panel-0');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Membership', 'Newcomers', 'Events', 'Volunteering', 'General'];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <Box 
      component="section" 
      id="faq" 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        position: 'relative',
        background: 'transparent'
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip 
            icon={<HelpOutlineIcon sx={{ fontSize: '18px !important' }} />}
            label="Common Questions & Guide"
            color="primary"
            variant="outlined"
            sx={{ 
              fontWeight: 700, 
              mb: 2, 
              borderColor: 'rgba(230, 74, 25, 0.4)',
              backgroundColor: 'rgba(230, 74, 25, 0.05)',
              color: 'primary.main',
              px: 1
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
              letterSpacing: '-0.02em',
              mb: 1.5,
              color: '#0f172a'
            }}
          >
            Frequently Asked <Box component="span" sx={{ color: 'primary.main' }}>Questions</Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '620px', mx: 'auto', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.6 }}
          >
            Everything you need to know about joining FAM, newcomer assistance, and participating in Kerala community festivals in Fredericton.
          </Typography>
        </Box>

        {/* Category Pills */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: 1, 
            mb: 4 
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              onClick={() => setSelectedCategory(cat)}
              sx={{
                fontWeight: 700,
                fontSize: '0.88rem',
                py: 2.2,
                px: 1,
                borderRadius: '20px',
                backgroundColor: selectedCategory === cat ? '#e64a19' : 'rgba(255, 255, 255, 0.8)',
                color: selectedCategory === cat ? '#ffffff' : '#475569',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#e64a19' : 'rgba(0,0,0,0.08)',
                boxShadow: selectedCategory === cat ? '0 4px 12px rgba(230, 74, 25, 0.25)' : 'none',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: selectedCategory === cat ? '#d84315' : 'rgba(230, 74, 25, 0.08)',
                }
              }}
            />
          ))}
        </Box>

        {/* Accordions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredFaqs.map((faq, index) => {
            const panelId = `panel-${index}`;
            const isCurrentExpanded = expanded === panelId;

            return (
              <Box
                key={faq.question}
                component={motion.div}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Accordion
                  expanded={isCurrentExpanded}
                  onChange={handleChange(panelId)}
                  elevation={0}
                  sx={{
                    borderRadius: '16px !important',
                    border: '1px solid',
                    borderColor: isCurrentExpanded ? 'rgba(230, 74, 25, 0.35)' : 'rgba(0, 0, 0, 0.06)',
                    backgroundColor: '#ffffff',
                    boxShadow: isCurrentExpanded 
                      ? '0 12px 28px -6px rgba(230, 74, 25, 0.12)' 
                      : '0 4px 14px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon 
                        sx={{ 
                          color: isCurrentExpanded ? 'primary.main' : '#64748b',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    }
                    sx={{
                      px: { xs: 2.5, sm: 3.5 },
                      py: 1,
                      '& .MuiAccordionSummary-content': { my: 1.5 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', pr: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '1.05rem', sm: '1.15rem' }, 
                          fontWeight: 700,
                          color: isCurrentExpanded ? '#e64a19' : '#0f172a',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 2.5, sm: 3.5 }, pb: 3, pt: 0 }}>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ lineHeight: 1.7, fontSize: { xs: '0.95rem', sm: '1.02rem' } }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </Box>

        {/* Bottom CTA Card */}
        <Box 
          sx={{ 
            mt: 6, 
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(230, 74, 25, 0.05) 0%, rgba(255, 179, 0, 0.08) 100%)',
            border: '1px dashed rgba(230, 74, 25, 0.3)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
            Still have questions or need newcomer guidance?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 500, mx: 'auto' }}>
            Our community volunteers are here to welcome you with open arms and assist your transition to Fredericton.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/contactus"
              variant="contained"
              sx={{ px: 3, py: 1, fontWeight: 700 }}
            >
              Contact Us Directly
            </Button>
            <Button
              component={RouterLink}
              to="/usefullinks"
              variant="outlined"
              sx={{ px: 3, py: 1, fontWeight: 700 }}
            >
              Browse Newcomer Directory
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;
