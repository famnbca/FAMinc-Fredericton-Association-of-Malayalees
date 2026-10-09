import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const defaultSiteName = 'Fredericton Association of Malayalees';
const defaultDescription = 'Join the Fredericton Association of Malayalees (FAM) in Canada to celebrate and promote the vibrant culture of Kerala. Connect with Malayalees, Indians in Fredericton, and New Brunswick.';
const defaultKeywords = 'malayalees in new brunswick, malayalees in fredericton, kerala new brunswick, kerala fredericton, indians in fredericton, indians in new brunswick, indian community in fredericton, indian community in new brunswick, fredericton association of malayalees, FAM, kerala canada, fredericton kerala association, Malayalees in Canada';
const baseUrl = 'https://famnb.ca';
const logoUrl = 'https://famnb.ca/images/logofam.avif';

const defaultSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  'name': 'Fredericton Association of Malayalees',
  'alternateName': ['FAM NB', 'FAM Fredericton'],
  'url': 'https://famnb.ca',
  'logo': logoUrl,
  'description': 'A registered non-profit organization promoting cultural and social activities of Malayalees in Fredericton, New Brunswick, Canada.',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Fredericton',
    'addressRegion': 'NB',
    'addressCountry': 'CA'
  },
  'sameAs': [
    'https://www.facebook.com/profile.php?id=61552104893247',
    'https://twitter.com',
    'https://youtube.com'
  ]
};

const HelmetWrapper = ({ pageTitle, description, structuredData, image }) => {
  const location = useLocation();

  // Ensure title is formatted cleanly without duplicating the brand name
  let fullTitle = defaultSiteName;
  if (pageTitle && pageTitle.trim().length > 0) {
    const trimmed = pageTitle.trim();
    if (trimmed.toLowerCase().includes('fredericton association of malayalees') || trimmed.toLowerCase().includes('fam nb')) {
      fullTitle = trimmed;
    } else {
      fullTitle = `${trimmed} | ${defaultSiteName}`;
    }
  }

  const metaDesc = description || defaultDescription;
  const canonicalUrl = `${baseUrl}${location.pathname === '/' ? '' : location.pathname}`;
  const ogImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : logoUrl;
  const jsonLd = structuredData || defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={defaultKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content={defaultSiteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default HelmetWrapper;
