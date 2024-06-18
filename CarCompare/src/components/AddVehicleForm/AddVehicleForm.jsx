import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-use-history";
import "./AddVehicleForm.css";

const AddVehicleForm = ({ onAddVehicle, onCloseModal }) => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [formValues, setFormValues] = useState({
        year: "",
        brand: "",
        model: "",
        type: "",
    });
    const history = useHistory();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/brand/list`);
                setBrands(response.data.data || []);
            } catch (error) {
                console.error("Error fetching brands:", error);
                setBrands([]);
            }
        };

        fetchBrands();
    }, []);

    const fetchModels = async (brandId) => {
        if (!brandId) return setModels([]);
        const response = await axios.get(`http://localhost:4000/api/model/listbybrand/${brandId}`);
        setModels(response.data.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        if (name === "brand") {
            fetchModels(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/api/car/search`, { params: formValues });
            onAddVehicle(response.data.data[0]);
            onCloseModal();
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const getYearsOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 2015;
        const years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        return years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <div className="add-vehicle-form">
            <h2>Add Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Year</label>
                    <select name="year" value={formValues.year} onChange={handleChange}>
                        <option>Select Year</option>
                        {getYearsOptions()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Make</label>
                    <select name="brand" value={formValues.brand} onChange={handleChange}>
                        <option>Select Make</option>
                        {brands.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Model</label>
                    <select name="model" value={formValues.model} onChange={handleChange}>
                        <option>Select Model</option>
                        {models.map((model) => (
                            <option key={model._id} value={model._id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Style</label>
                    <select name="type" value={formValues.type} onChange={handleChange}>
                        <option>Select Style</option>
                        <option value="SUV">SUV</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Wagon">Wagon</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Pickup Truck">Pickup Truck</option>
                    </select>
                </div>
                <button className="add-vehicle-btn" type="submit">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicleForm;
