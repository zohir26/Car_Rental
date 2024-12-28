import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/public/Review.json')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">What our customers are saying</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={review.photo_url} alt={review.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.comment}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReview;
