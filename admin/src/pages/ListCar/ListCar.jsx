import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./ListCar.css";

const ListCar = ({ url }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${url}/api/car/list`);
        if (response.data.success) {
          setCars(response.data.data);
        } else {
          toast.error("Error fetching cars");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Error fetching cars");
      }
    };

    fetchCars();
  }, [url]);

  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this model?")) {
    try {
      const response = await axios.post(`${url}/api/car/remove`, { id: carId });
      if (response.data.success) {
        toast.success("Car deleted successfully");
        // Remove the deleted car from the state
        setCars(cars.filter((car) => car._id !== carId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Error deleting car");
    }
  }
  };

  return (
    <div className="list-car">
      <h2>Car List</h2>
      {cars.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Type</th>
              <th>Year</th>
              <th>Fuel Type</th>
              <th>Transmission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img
                    src={`${url}/images/${car.image}`}
                    alt={car.model.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{car.brand.name}</td>
                <td>{car.model.name}</td>
                <td>{car.type}</td>
                <td>{car.year}</td>
                <td>{car.fuelType}</td>
                <td>{car.transmission}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/edit-car/${car._id}`}>Edit</Link>
                    <button onClick={() => handleDelete(car._id)}>x</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cars found</p>
      )}
    </div>
  );
};

export default ListCar;
