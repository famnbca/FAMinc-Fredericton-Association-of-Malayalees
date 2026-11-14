import React, { useState, useEffect, Suspense } from 'react';
import { Element } from 'react-scroll';
import Loading from '../Loading';
import FullWidthImage from '../FullWidthImage';
import BacklinkInfo from '../BacklinkInfo';
import HelmetWrapper from '../HelmetWrapper';
import { faqData } from '../FAQSection';

const LandingPage = React.lazy(() => import('../Landingpage'));
const AboutUs = React.lazy(() => import('../AboutUs'));
const Steps = React.lazy(() => import('../Steps'));
const MissionVision = React.lazy(() => import('../MissionVision'));
const UpcomingEvent = React.lazy(() => import('../UpcomingEvent'));
const JoinComponent = React.lazy(() => import('../JoinComponent'));
const FAQSection = React.lazy(() => import('../FAQSection'));

const MainPage = React.memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadComponents = async () => {
      const components = [
        import('../Landingpage'),
        import('../AboutUs'),
        import('../MissionVision'),
        import('../Steps'),
        import('../UpcomingEvent'),
        import('../JoinComponent'),
        import('../FAQSection'),
        import('../BacklinkInfo')
      ];

      try {
        await Promise.all(components);
      } catch (error) {
        console.error('Error preloading components', error);
      } finally {
        setLoading(false);
      }
    };

    preloadComponents();
  }, []);

  if (loading) {
    return <Loading loading={true} />;
  }

  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqData.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <>
      <HelmetWrapper 
        pageTitle="Fredericton Association of Malayalees | FAM NB - Kerala Community in Canada" 
        description="Official website of the Fredericton Association of Malayalees (FAM NB), a registered non-profit organization in New Brunswick. Discover Kerala cultural festivals (Onam, Vishu), newcomer settlement resources, community events, and family memberships." 
        structuredData={[faqSchema]}
      />

      <Suspense fallback={<Loading loading={true} />}>
        <Element name="home" id="home"><LandingPage /></Element>
        <Element name="about" id="about"><AboutUs /></Element>
        <Steps />
        <Element name="mission" id="mission"><MissionVision /></Element>
        <UpcomingEvent />
        <JoinComponent />
        <FAQSection />
        <BacklinkInfo />
        <FullWidthImage />
      </Suspense>
    </>
  );
});

export default MainPage;
