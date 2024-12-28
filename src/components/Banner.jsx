import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TypeAnimation } from 'react-type-animation';
// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

import car1 from '../assets/car-1.jpg';
import car2 from '../assets/car-2.jpg';
import car3 from '../assets/car-3.jpg';
import car4 from '../assets/car-4.jpg';
import car5 from '../assets/car-5.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='h-full flex justify-center items-center py-4 '
    >
      <div className='absolute z-50 text-black text-center'>
        <TypeAnimation sequence={['"Drive Your Dreams Today!"', 1000, 'Experience the best rental cars at affordable prices', 2000,]}
          wrapper="span" speed={50} style={{ fontSize: '2em', display: 'inline-block' }} repeat={Infinity} /> <div className='mt-4'>
          <Link to=''> <button className='mt-2 px-4 py-2  bg-blue-600 text-white rounded-md'>View Available Cars</button> </Link> </div> </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Number of slides visible at the same time
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        loop={true} // Enable infinite looping
        autoplay={{ delay: 3000 }} // Autoplay with 3-second delay
        pagination={{ clickable: true }} // Enable pagination dots
        style={{
          width: '100vw', height:
            '50vh', opacity: 0.7
        }} // Set Swiper size
      >
        <SwiperSlide>
          <img src={car1} alt="Car 1" className='w-full h-full object-cover' style={{ opacity: 0.7 }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={car2} alt="Car 2" className='w-full h-full object-cover' style={{ opacity: 0.7 }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={car3} alt="Car 3" className='w-full h-full object-cover' style={{ opacity: 0.7 }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={car4} alt="Car 4" className='w-full h-full object-cover' style={{ opacity: 0.7 }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={car5} alt="Car 5" className='w-full h-full object-cover' style={{ opacity: 0.7 }} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
