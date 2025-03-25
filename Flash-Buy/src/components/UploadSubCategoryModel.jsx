import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { motion } from 'framer-motion';

const UploadSubCategoryModel = ({ close, fetchData }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: '',
        image: '',
        category: []
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
            category: prev.category.filter(el => el._id !== categoryId)
        }));
    };

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({ ...SummaryApi.createSubCategory, data: subCategoryData });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close && close();
                fetchData && fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <motion.section 
            className='fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4'
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className='w-full max-w-3xl bg-neutral-900 p-6 rounded-2xl shadow-lg border border-neutral-700 text-white'
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }}
            >
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-semibold text-yellow-400'>Add Sub Category</h1>
                    <button onClick={close} className='text-gray-400 hover:text-yellow-400'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='mt-4 grid gap-4' onSubmit={handleSubmitSubCategory}>
                    <div>
                        <label htmlFor='name' className='block text-sm text-gray-300'>Name</label>
                        <input 
                            id='name' 
                            name='name' 
                            value={subCategoryData.name} 
                            onChange={handleChange} 
                            className='w-full p-3 bg-neutral-800 border border-neutral-700 outline-none focus:border-yellow-400 rounded-lg'
                        />
                    </div>
                    <div>
                        <p className='text-sm text-gray-300'>Image</p>
                        <div className='flex items-center gap-3'>
                            <div className='h-36 w-36 flex items-center justify-center bg-neutral-800 border border-neutral-700 rounded-lg'>
                                {subCategoryData.image ? (
                                    <img alt='subCategory' src={subCategoryData.image} className='w-full h-full object-cover rounded-lg' />
                                ) : (
                                    <p className='text-sm text-gray-500'>No Image</p>
                                )}
                            </div>
                            <label htmlFor='uploadSubCategoryImage' className='px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg cursor-pointer hover:bg-yellow-300'>
                                Upload Image
                                <input type='file' id='uploadSubCategoryImage' className='hidden' onChange={handleUploadSubCategoryImage} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className='text-sm text-gray-300'>Select Category</label>
                        <div className='border border-neutral-700 rounded-lg p-2'>
                            <div className='flex flex-wrap gap-2 mb-2'>
                                {subCategoryData.category.map(cat => (
                                    <p key={cat._id} className='bg-neutral-800 px-2 py-1 rounded-lg flex items-center gap-2 text-gray-300'>
                                        {cat.name}
                                        <span className='cursor-pointer text-red-500 hover:text-red-400' onClick={() => handleRemoveCategorySelected(cat._id)}>
                                            <IoClose size={18} />
                                        </span>
                                    </p>
                                ))}
                            </div>
                            <select
                                className='w-full p-2 bg-neutral-900 text-gray-300 outline-none border border-neutral-700 rounded-lg'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!value) return;
                                    const categoryDetails = allCategory.find(el => el._id === value);
                                    setSubCategoryData(prev => ({ ...prev, category: [...prev.category, categoryDetails] }));
                                }}
                            >
                                <option value=''>Select Category</option>
                                {allCategory.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button 
                        className={`px-4 py-2 font-semibold rounded-lg transition-all ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`} 
                        disabled={!subCategoryData.name || !subCategoryData.image || !subCategoryData.category.length}
                    >
                        Submit
                    </button>
                </form>
            </motion.div>
        </motion.section>
    );
};

export default UploadSubCategoryModel;
