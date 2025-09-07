import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import FeaturedSection from '../FeaturedSection/FeaturedSection';
import Review from '../Review/Review';
import CallToAction from '../CallToAction/CallToAction';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <>
           <Banner></Banner>
           <Category></Category>
           <FeaturedSection></FeaturedSection>
           <Review></Review>
           <CallToAction></CallToAction>
           <ContactUs></ContactUs>
        </>
    );
};

export default Home;