import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);

  const toggleBrandDropdown = () => {
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
  };

  const toggleModelDropdown = () => {
    setIsModelDropdownOpen(!isModelDropdownOpen);
  };

  const toggleCarDropdown = () => {
    setIsCarDropdownOpen(!isCarDropdownOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="sidebar-option" onClick={toggleBrandDropdown}>
          <img src={assets.order_icon} alt="" />
          <p>Brand</p>
        </div>
        <div className={`dropdown ${isBrandDropdownOpen ? 'open' : ''}`}>
          <NavLink to={"/addbrand"} className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Brand</p>
          </NavLink>
          <NavLink to={"/brandlist"} className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Brand</p>
          </NavLink>
        </div>

        <div className="sidebar-option" onClick={toggleModelDropdown}>
          <img src={assets.order_icon} alt="" />
          <p>Model</p>
        </div>
        <div className={`dropdown ${isModelDropdownOpen ? 'open' : ''}`}>
          <NavLink to={"/addmodel"} className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Model</p>
          </NavLink>
          <NavLink to={"/modellist"} className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Model</p>
          </NavLink>
        </div>

        <div className="sidebar-option" onClick={toggleCarDropdown}>
          <img src={assets.order_icon} alt="" />
          <p>Car</p>
        </div>
        <div className={`dropdown ${isCarDropdownOpen ? 'open' : ''}`}>
          <NavLink to={"/addcar"} className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Car</p>
          </NavLink>
          <NavLink to={"/carlist"} className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Car</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
