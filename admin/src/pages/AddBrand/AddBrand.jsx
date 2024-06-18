import React, { useState } from "react";
import "./AddBrand.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-use-history";

const AddBrand = ({url, token}) => {
  const [logo, setImage] = useState(false);
  const [data, setData] = useState({
    name: ""
  });
  const history = useHistory();


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", logo);
    const response = await axios.post(`${url}/api/brand/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.success) {
      setData({
        name: ""
      });
      setImage(false);
      toast.success(response.data.message);

      history.push("/brandlist");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <h2>Add Brand</h2>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload logo</p>
          <label htmlFor="logo">
            <img
              src={logo ? URL.createObjectURL(logo) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="logo"
            required
          />
        </div>
        <div className="add-brand-name flex-col">
          <p>Brand name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
