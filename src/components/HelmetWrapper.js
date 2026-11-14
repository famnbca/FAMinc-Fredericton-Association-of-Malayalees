import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const defaultSiteName = 'Fredericton Association of Malayalees';
const defaultDescription = 'Join the Fredericton Association of Malayalees (FAM) in New Brunswick, Canada. Celebrating Kerala culture, festivals (Onam, Vishu), newcomer settlement support, and community events.';
const defaultKeywords = 'malayalees in new brunswick, malayalees in fredericton, kerala new brunswick, kerala fredericton, indians in fredericton, indians in new brunswick, indian community in fredericton, indian community in new brunswick, fredericton association of malayalees, FAM NB, kerala canada, fredericton kerala association, Malayalees in Canada, newcomer settlement NB';
const baseUrl = 'https://famnb.ca';
const logoUrl = 'https://famnb.ca/images/logofam.avif';
const defaultOgImage = 'https://famnb.ca/images/heroimages/Fredericton_Sunset_2021.avif';

const defaultOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  '@id': 'https://famnb.ca/#organization',
  'name': 'Fredericton Association of Malayalees',
  'alternateName': ['FAM NB', 'FAM Fredericton', 'Fredericton Malayalee Association'],
  'url': 'https://famnb.ca',
  'logo': logoUrl,
  'image': defaultOgImage,
  'description': 'A registered non-profit organization promoting cultural and social activities of Malayalees in Fredericton, New Brunswick, Canada.',
  'foundingDate': '2021',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Fredericton',
    'addressRegion': 'NB',
    'postalCode': 'E3B',
    'addressCountry': 'CA'
  },
  'areaServed': {
    '@type': 'AdministrativeArea',
    'name': 'New Brunswick'
  },
  'sameAs': [
    'https://www.facebook.com/profile.php?id=61552104893247'
  ]
};

const HelmetWrapper = ({ pageTitle, description, keywords, structuredData, image, type = 'website' }) => {
  const location = useLocation();

  let fullTitle = `${defaultSiteName} | FAM NB - Kerala Community in Canada`;
  if (pageTitle && pageTitle.trim().length > 0) {
    const trimmed = pageTitle.trim();
    if (trimmed.toLowerCase().includes('fredericton association of malayalees') || trimmed.toLowerCase().includes('fam nb')) {
      fullTitle = trimmed;
    } else {
      fullTitle = `${trimmed} | ${defaultSiteName} (FAM NB)`;
    }
  }

  const metaDesc = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const canonicalUrl = `${baseUrl}${location.pathname === '/' ? '' : location.pathname}`;
  const ogImage = image 
    ? (image.startsWith('http') ? image : `${baseUrl}${image}`) 
    : defaultOgImage;

  // Breadcrumb schema generator based on current route
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': baseUrl
    }
  ];

  if (pathSegments.length > 0) {
    let currentPath = baseUrl;
    pathSegments.forEach((segment, idx) => {
      currentPath += `/${segment}`;
      const readableName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': idx + 2,
        'name': readableName,
        'item': currentPath
      });
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems
  };

  // Combine schemas
  let schemasToRender = [defaultOrganizationSchema, breadcrumbSchema];
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemasToRender = [...schemasToRender, ...structuredData];
    } else {
      schemasToRender.push(structuredData);
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Local & Geo SEO */}
      <meta name="geo.region" content="CA-NB" />
      <meta name="geo.placename" content="Fredericton" />
      <meta name="geo.position" content="45.9636;-66.6431" />
      <meta name="ICBM" content="45.9636, -66.6431" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="Fredericton Association of Malayalees (FAM NB)" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* JSON-LD Structured Data */}
      {schemasToRender.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default HelmetWrapper;
