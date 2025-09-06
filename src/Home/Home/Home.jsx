import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import FeaturedSection from '../FeaturedSection/FeaturedSection';
import Review from '../Review/Review';

const Home = () => {
    return (
        <>
           <Banner></Banner>
           <Category></Category>
           <FeaturedSection></FeaturedSection>
           <Review></Review>
        </>
    );
};

export default Home;