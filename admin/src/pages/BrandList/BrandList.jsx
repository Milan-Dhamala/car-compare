import React, { useEffect, useState } from 'react';
import './BrandList.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const BrandList = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/brand/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching brands");
    }
  };

  const removeBrand = async (brandId) => {
    const confirmed = window.confirm("Are you sure you want to remove this brand?");
    if (!confirmed) {
      return; // If user cancels, exit the function
    }
    const response = await axios.post(`${url}/api/brand/remove`, { id: brandId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing brand");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Brands List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Logo</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.logo} alt="" />
              <p>{item.name}</p>
              <div className='actions'>
                <Link to={`/edit-brand/${item._id}`} className='cursor'>Edit</Link>
                <p onClick={() => removeBrand(item._id)} className='cursor'>X</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandList;
