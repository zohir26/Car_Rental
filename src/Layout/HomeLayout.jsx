import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListing from '../components/RecentListing';
import CustomerReview from '../components/CustomerReview';
import Deals from '../components/Deals';
import SearchBar from '../components/SearchBar';

const HomeLayout = () => {
    // Manage theme state here
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Update theme in localStorage and apply to <html> tag
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div data-theme={theme} className='flex flex-col min-h-screen'>
            {/* Pass theme and setTheme to Navbar */}
            <Navbar theme={theme} setTheme={setTheme} />

            {/* Main Content */}
            <main className='flex-grow'>
                <div className='h-[500px]'>
                    <Banner />
                </div>
                <div>
                    <WhyChooseUs />
                </div>
                <div>
                    <RecentListing />
                </div>
                <div>
                    <CustomerReview />
                </div>
                <div>
                    <Deals />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomeLayout;
