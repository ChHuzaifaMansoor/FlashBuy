import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { motion } from 'framer-motion';

const EditSubCategory = ({ close, data, fetchData }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: data.category || []
    });
    const allCategory = useSelector(state => state.product.allCategory);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryData(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setSubCategoryData(prev => ({ ...prev, image: ImageResponse.data.url }));
    };

    const handleRemoveCategorySelected = (categoryId) => {
        setSubCategoryData(prev => ({
            ...prev,
            category: prev.category.filter(cat => cat._id !== categoryId)
        }));
    };

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <motion.section 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4'
        >
            <motion.div 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0.8 }}
                className='w-full max-w-3xl bg-gray-900 text-white p-6 rounded-xl shadow-xl'
            >
                <div className='flex items-center justify-between border-b border-gray-700 pb-3'>
                    <h1 className='text-xl font-semibold text-yellow-400'>Edit Sub Category</h1>
                    <button onClick={close} className='text-gray-400 hover:text-white'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='mt-4 space-y-4' onSubmit={handleSubmitSubCategory}>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium'>Name</label>
                        <input 
                            id='name' name='name' value={subCategoryData.name} 
                            onChange={handleChange} 
                            className='w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-yellow-400' 
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium'>Image</label>
                        <div className='flex items-center gap-3'>
                            <div className='border border-gray-700 bg-gray-800 w-32 h-32 flex items-center justify-center rounded'>
                                {subCategoryData.image ? (
                                    <img src={subCategoryData.image} alt='subCategory' className='w-full h-full object-cover rounded' />
                                ) : (
                                    <p className='text-gray-500 text-sm'>No Image</p>
                                )}
                            </div>
                            <label className='cursor-pointer bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded shadow hover:bg-yellow-400 transition-all'>
                                Upload Image
                                <input type='file' id='uploadSubCategoryImage' className='hidden' onChange={handleUploadSubCategoryImage} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium'>Select Category</label>
                        <div className='border border-gray-600 bg-gray-800 rounded p-2'>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                {subCategoryData.category.map(cat => (
                                    <span key={cat._id} className='bg-yellow-500 text-gray-900 px-2 py-1 rounded flex items-center gap-2'>
                                        {cat.name}
                                        <IoClose className='cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategorySelected(cat._id)} />
                                    </span>
                                ))}
                            </div>
                            <select
                                className='w-full bg-gray-900 text-white p-2 rounded focus:outline-none border border-gray-700'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!value) return;
                                    const categoryDetails = allCategory.find(el => el._id === value);
                                    setSubCategoryData(prev => ({
                                        ...prev,
                                        category: [...prev.category, categoryDetails]
                                    }));
                                }}
                            >
                                <option value=''>Select Category</option>
                                {allCategory.map(category => (
                                    <option key={category._id} value={category._id} className='text-black'>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-2 rounded font-semibold transition-all ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`} 
                        disabled={!subCategoryData.name || !subCategoryData.image || !subCategoryData.category.length}
                    >
                        Submit
                    </motion.button>
                </form>
            </motion.div>
        </motion.section>
    );
};

export default EditSubCategory;