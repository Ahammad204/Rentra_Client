import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import FeaturedSection from '../FeaturedSection/FeaturedSection';

const Home = () => {
    return (
        <>
           <Banner></Banner>
           <Category></Category>
           <FeaturedSection></FeaturedSection>
        </>
    );
};

export default Home;