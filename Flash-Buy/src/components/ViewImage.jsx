import React from 'react';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

const ViewImage = ({ url, close }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-3xl p-4 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button 
          onClick={close} 
          className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <IoClose size={25} />
        </button>
        <img 
          src={url} 
          alt="Preview" 
          className="w-full max-h-[75vh] object-contain rounded"
        />
      </motion.div>
    </motion.div>
  );
};

export default ViewImage;