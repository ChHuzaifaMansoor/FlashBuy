import React from 'react';
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

const CofirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-60 flex justify-center items-center p-4'>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg text-white'
      >
        <div className='flex justify-between items-center border-b border-gray-700 pb-3'>
          <h1 className='text-lg font-bold text-yellow-400'>Permanent Delete</h1>
          <button onClick={close} className='text-gray-400 hover:text-white'>
            <IoClose size={25} />
          </button>
        </div>
        <p className='my-4 text-gray-300'>Are you sure you want to permanently delete this item?</p>
        <div className='flex justify-end gap-3'>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={cancel} 
            className='px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded'
          >
            Cancel
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={confirm} 
            className='px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded'
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CofirmBox;