import React, { useState } from "react";
import Modal from "../Modal/Modal";
import AddVehicleForm from "../AddVehicleForm/AddVehicleForm";
import CarCard from "../CarCard/CarCard"; 
import "./Compare.css";

const Compare = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [carsColumn1, setCarsColumn1] = useState([]);
    const [carsColumn2, setCarsColumn2] = useState([]);
    const [carsColumn3, setCarsColumn3] = useState([]);


    const handleOpenModal = (column) => {
        setSelectedColumn(column);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedColumn(null);
    };

    const handleAddVehicle = (newCar) => {
        if (selectedColumn === 1) {
            setCarsColumn1([...carsColumn1, newCar]);
        } else if (selectedColumn === 2) {
            setCarsColumn2([...carsColumn2, newCar]);
        }
        else if (selectedColumn === 3) {
            setCarsColumn3([...carsColumn3, newCar]);
        }
    };

    const handleDeleteVehicle = (column, index) => {
        if (column === 1) {
            setCarsColumn1(carsColumn1.filter((_, i) => i !== index));
        } else if (column === 2) {
            setCarsColumn2(carsColumn2.filter((_, i) => i !== index));
        }
        else if(column === 3) {
            setCarsColumn3(carsColumn3.filter((_, i) => i !== index));
        }
    };

    return (
        <div id="compare-page" className="compare-page">
            <div className="compare-cars-container">
                <h1>Compare Cars Side-by-Side</h1>
                <div className="columns">
                    <div className="column">
                        {carsColumn1.map((car, index) => (
                            <CarCard key={index} car={car} onDelete={() => handleDeleteVehicle(1, index)} />
                        ))}
                        <button className="add-vehicle-btn" onClick={() => handleOpenModal(1)}>
                            + Add a vehicle
                        </button>
                    </div>
                    <div className="column">
                        {carsColumn2.map((car, index) => (
                            <CarCard key={index} car={car} onDelete={() => handleDeleteVehicle(2, index)} />
                        ))}
                        <button className="add-vehicle-btn" onClick={() => handleOpenModal(2)}>
                            + Add a vehicle
                        </button>
                    </div>
                    <div className="column">
                        {carsColumn3.map((car, index) => (
                            <CarCard key={index} car={car} onDelete={() => handleDeleteVehicle(3, index)} />
                        ))}
                        <button className="add-vehicle-btn" onClick={() => handleOpenModal(3)}>
                            + Add a vehicle
                        </button>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <AddVehicleForm onAddVehicle={handleAddVehicle} onCloseModal={handleCloseModal} />
                </Modal>
            </div>
        </div>
    );
};

export default Compare;
