import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/Review.json')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="py-16 bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-extrabold text-center text-base-content mb-8">What our customers are saying</h2>
        
        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="flex flex-col items-center text-center p-6 bg-base-200 text-base-content shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Reviewer Image */}
                <img 
                  src={review.photo_url} 
                  alt={review.name} 
                  className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-gray-200 text-base-content"
                />
                {/* Reviewer Name */}
                <h3 className="text-xl font-semibold mb-2 text-base-content">{review.name}</h3>
                {/* Star Ratings */}
                <div className="flex items-center justify-center mb-2 text-base-content">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                {/* Reviewer Comment */}
                <p className="text-gray-600 mb-4 text-sm md:text-base-content">{review.comment}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReview;
