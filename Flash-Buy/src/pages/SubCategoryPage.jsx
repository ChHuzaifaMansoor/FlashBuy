import React, { useEffect, useState } from 'react';
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import EditSubCategory from '../components/EditSubCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ImageURL, setImageURL] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ _id: '' });
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: '' });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const columnHelper = createColumnHelper();
  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => (
        <div className='flex justify-center'>
          <motion.img
            src={row.original.image}
            alt={row.original.name}
            className='w-12 h-12 rounded-lg cursor-pointer shadow-lg hover:scale-110 transition'
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => (
        <div className='flex flex-wrap gap-2'>
          {row.original.category.map((c) => (
            <span key={c._id} className='bg-yellow-500 px-2 py-1 rounded-full text-xs font-medium text-black shadow'>
              {c.name}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className='flex items-center gap-3 justify-center'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className='p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-500'
            onClick={() => {
              setOpenEdit(true);
              setEditData(row.original);
            }}
          >
            <HiPencil size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className='p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-500'
            onClick={() => {
              setOpenDeleteConfirmBox(true);
              setDeleteSubCategory(row.original);
            }}
          >
            <MdDelete size={18} />
          </motion.button>
        </div>
      ),
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: '' });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='min-h-screen p-6 bg-gray-900 text-white'>
      <div className='p-4 bg-gray-800 rounded-lg shadow-lg flex items-center justify-between'>
        <h2 className='text-xl font-bold text-yellow-400'>Sub Category</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenAddSubCategory(true)}
          className='bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded shadow hover:bg-yellow-400 transition-all'
        >
          Add Sub Category
        </motion.button>
      </div>

      <div className='overflow-auto w-full mt-6'>
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} fetchData={fetchSubCategory} />
      )}

      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL('')} />}

      {openEdit && <EditSubCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchSubCategory} />}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
