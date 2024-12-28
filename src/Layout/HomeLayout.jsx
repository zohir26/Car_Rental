import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListing from '../components/RecentListing';
import CustomerReview from '../components/CustomerReview';
import Deals from '../components/Deals';

const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            {/* Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <main className='flex-grow'>
                <div className='h-[500px]'>
                    <Banner />
                </div>
                <div>
                    <WhyChooseUs></WhyChooseUs>
                </div>
                <div>
                    <RecentListing></RecentListing>
                </div>
                <div>
                    <CustomerReview></CustomerReview>
                </div>
                <div>
                    <Deals></Deals>
                </div>
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomeLayout;
