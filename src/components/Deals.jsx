import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Deals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('/Deals.json')
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Enjoy Extra Miles with Our Best Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg overflow-hidden"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${deal.photo_url})` }}
              ></div>
              <div className="relative z-10 p-4 bg-gray-800 bg-opacity-60 w-full rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">{deal.discount_title}</h3>
                <p className="text-white">{deal.offer_duration}</p>
                <p className="text-white text-xl font-bold">{deal.discount_percentage}% OFF</p>
                <Link to=''>
                <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300">Book Now</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
