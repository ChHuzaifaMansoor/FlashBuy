import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { motion } from 'framer-motion';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({ name: '', image: '' });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({ _id: '' });

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios(SummaryApi.getCategory);
            const { data: responseData } = response;
            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({ ...SummaryApi.deleteCategory, data: deleteCategory });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white p-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-lg flex items-center justify-between">
                <h2 className="text-xl font-bold text-yellow-400">Category</h2>
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpenUploadCategory(true)}
                    className="bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded shadow hover:bg-yellow-400 transition-all"
                >
                    Add Category
                </motion.button>
            </div>

            {!categoryData.length && !loading && <NoData />}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
                {categoryData.map((category) => (
                    <motion.div 
                        key={category._id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
                    >
                        <img 
                            alt={category.name} 
                            src={category.image} 
                            className="w-full h-32 object-contain rounded"
                        />
                        <h3 className="mt-2 text-lg font-semibold text-yellow-400">{category.name}</h3>
                        <div className="mt-3 flex w-full gap-2">
                            <button 
                                onClick={() => { setOpenEdit(true); setEditData(category); }}
                                className="flex-1 bg-green-500 hover:bg-green-400 text-white font-medium py-1 rounded"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => { setOpenConfirmBoxDelete(true); setDeleteCategory(category); }}
                                className="flex-1 bg-red-500 hover:bg-red-400 text-white font-medium py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {loading && <Loading />}

            {openUploadCategory && <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />}
            {openEdit && <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />}
            {openConfirmBoxDelete && <CofirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />}
        </section>
    );
};

export default CategoryPage;
