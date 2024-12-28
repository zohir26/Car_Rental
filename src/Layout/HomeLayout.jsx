import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

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
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomeLayout;
