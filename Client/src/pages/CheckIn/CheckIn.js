import React, { useState } from "react";
import { Input, Button, Alert } from "antd";
import "./Checkin.css";
const CheckIn = () => {
  // Name, License plate ID, Phone, Ticket type, Vehicle type, Vehicle height, Vehicle width, Vehicle length.
  const ticketsType = ["VIP", "Value", "Regular"];
  const vehiclesType = [
    "Motorcycle",
    "Private",
    "Crossover",
    "SUV",
    "Van",
    "ruck",
  ];
  const [formData, setFormData] = useState({
    Name: "",
    LicensePlateID: "",
    Phone: "",
    TicketType: "",
    VehicleType: "",
    VehicleHeight: "",
    VehicleWidth: "",
    VehicleLength: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    const newErrors = {};

    // Validation rules (you can customize these)
    if (formData.Name === "") {
      newErrors.Name = "Name is required";
    }

    if (formData.LicensePlateID === "") {
      newErrors.LicensePlateID = "License Plate ID is required";
    }
    if (formData.Phone === "") {
      newErrors.Phone = "Phone is required";
    }
    if (!ticketsType.includes(formData.TicketType)) {
      newErrors.TicketType = `ticket Type has to be equeal to: ${ticketsType.join(
        " | "
      )}`;
    }

    if (!vehiclesType.includes(formData.VehicleType)) {
      newErrors.VehicleType = `vehicle type has to be equeal to: ${vehiclesType.join(
        " | "
      )}`;
    }
    if (formData.VehicleHeight === "" || formData.VehicleHeight === "0") {
      newErrors.VehicleHeight = "enter Vehicle Height ";
    }
    if (formData.VehicleLength === "" || formData.VehicleLength === "0") {
      newErrors.VehicleLength = "enter Vehicle Length ";
    }
    if (formData.VehicleWidth === "" || formData.VehicleWidth === "0") {
      newErrors.VehicleWidth = "enter Vehicle Width ";
    }
    setErrors(newErrors);
  };
  const submitForm = () => {
    validation();
  };
  return (
    <div className='checkin_container'>
      <h1>Check in vehicle</h1>
      {Object.keys(formData).map((fieldName) => (
        <>
          <Input
            className={errors[fieldName] ? "" : "form_fields"}
            key={fieldName}
            type='text'
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleInputChange}
            placeholder={fieldName}
            status={errors[fieldName] ? "error" : undefined}
          />
          {errors[fieldName] && (
            <Alert
              className='form_fields'
              message={errors[fieldName]}
              type='error'
              showIcon
            />
          )}
        </>
      ))}
      <Button
        className='checkIn_button'
        onClick={submitForm}>
        CheckIn
      </Button>
    </div>
  );
};

export default CheckIn;
