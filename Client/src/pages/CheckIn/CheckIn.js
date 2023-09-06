import React, { useEffect, useState } from "react";
import { Input, Button, Alert, Card, Space } from "antd";
import "./Checkin.css";
import axios from "axios";
import { AxiosHeaders, SERVER_ADRESS, vehiclesType } from "../../consts";
import Swal from "sweetalert2";
import {
  getTicketFromDictByType,
  getVehicleClassByVehicle,
} from "../../Utils.js/utils";
import InputWithError from "../../SharedComponent/InputWithError/InputWithError";
import TradeModal from "./TradeModal/TradeModal";
import { useNavigate } from "react-router-dom";
const CheckIn = () => {
  // Name, License plate ID, Phone, Ticket type, Vehicle type, Vehicle height, Vehicle width, Vehicle length.

  const propertiesToDelete = ["VehicleHeight", "VehicleWidth", "VehicleLength"];

  const [formData, setFormData] = useState({
    //the form data
    Name: "",
    LicensePlateID: "",
    Phone: "",
    TicketType: "",
    VehicleType: "",
    VehicleHeight: "",
    VehicleWidth: "",
    VehicleLength: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [optionalTickets, setOptionalTickets] = useState(); //store the given alternative ticket if needed
  const [errors, setErrors] = useState({}); //form errors
  const [vehicleClass, setVehicleClass] = useState({}); //store the vehicleClass from the server
  const [tickets, setTickets] = useState({}); //store the tickets from the server
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    async function fetchData() {
      const ticketsFromServer = await axios.get(
        `${SERVER_ADRESS}/api/Garage/Tickets`,
        { headers: AxiosHeaders }
      );
      const vehicleClassFromServer = await axios.get(
        `${SERVER_ADRESS}/api/Garage/vehicleClasses`,
        { headers: AxiosHeaders }
      );
      setTickets(ticketsFromServer.data);
      setVehicleClass(vehicleClassFromServer.data);
    }
    fetchData();
  }, []);

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
      //without valid phone validation
      newErrors.Phone = "Phone is required";
    }
    if (!(formData.TicketType in tickets)) {
      newErrors.TicketType = `ticket Type has to be equeal to: ${Object.keys(
        tickets
      ).join(" | ")}`;
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
    return Object.keys(newErrors).length === 0;
  };
  const handleTrade = (value) => {
    insertVehicle(value);
  };

  //delete properties from obj
  const deleteObjProperties = (propertiesToDelete, obj) => {
    propertiesToDelete.forEach((propertyName) => {
      if (obj.hasOwnProperty(propertyName)) {
        delete obj[propertyName];
      }
    });
  };
  //create vehicle obj for insert vehicle request
  const createValidVehicle = () => {
    const vehicle = {
      ...formData,
      VehicleClass: getVehicleClassByVehicle(
        vehicleClass,
        formData.VehicleType
      ),
      Dimensions: {
        Height: Number(formData.VehicleHeight),
        Width: Number(formData.VehicleWidth),
        Length: Number(formData.VehicleLength),
      },
    };
    deleteObjProperties(propertiesToDelete, vehicle);
    return vehicle;
  };

  const insertVehicle = async (ticketType) => {
    try {
      debugger;
      const vehicle = createValidVehicle();
      if (ticketType) vehicle.TicketType = ticketType;
      const response = await axios.post(
        `${SERVER_ADRESS}/api/Garage/checkIn`,
        vehicle,
        { headers: AxiosHeaders }
        // vehicle
      );
      if (response.status === 200) {
        await Swal.fire({
          title: "success",
          text: "The vehicle add to the garage",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",

        icon: "error",
      });
    }
  };

  //chack if dimensions fit in parking lot and if there is optional parking spot by ticket
  const canPark = async () => {
    try {
      const obj = {
        height: Number(formData.VehicleHeight),
        width: Number(formData.VehicleWidth),
        length: Number(formData.VehicleLength),
        TicketType: formData.TicketType,
      };
      const response = await axios.get(
        `${SERVER_ADRESS}/api/Ticket/checkFit`,
        { params: obj },
        { headers: AxiosHeaders }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //get the suitable tickets for the vehicle
  const getSuitableTickets = async () => {
    try {
      const obj = {
        height: Number(formData.VehicleHeight),
        width: Number(formData.VehicleWidth),
        length: Number(formData.VehicleLength),
      };
      const response = await axios.get(
        `${SERVER_ADRESS}/api/Ticket/getSuitableTickets`,
        { params: obj },
        { headers: AxiosHeaders }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  //handle submit
  const submitForm = async () => {
    if (validation()) {
      if (await canPark()) {
        insertVehicle();
      } else {
        const tickets = await getSuitableTickets();
        if (tickets) {
          setOptionalTickets(tickets);
          setOpenModal(true);
        } else {
          Swal.fire({
            title: "Sorry you can't park rignt now",

            icon: "error",
          });
        }
      }
    }
  };

  return (
    <div className='center_page'>
      <h1>Check in vehicle</h1>
      <div className='checkin_container'>
        <span className='form_container'>
          {Object.keys(formData).map((fieldName) => (
            <InputWithError
              key={fieldName}
              fieldName={fieldName}
              error={errors[fieldName]}
              value={formData[fieldName]}
              handleInputChange={handleInputChange}
            />
          ))}

          <Button
            className='checkIn_button'
            onClick={submitForm}>
            CheckIn
          </Button>
        </span>
        <span className='cards_container'>
          <Space
            direction='vertical'
            size={16}>
            <Card
              title='tickets Price'
              style={{ width: 300 }}>
              {Object.values(tickets).map((ticket) => {
                return (
                  <p
                    key={
                      ticket.type
                    }>{`Ticket type: ${ticket.type} cost: ${ticket.price}$`}</p>
                );
              })}
            </Card>
          </Space>
        </span>
      </div>
      {openModal && optionalTickets && (
        <TradeModal
          tickets={optionalTickets}
          openModal={openModal}
          handleTrade={handleTrade}
          paidTicketPrice={
            getTicketFromDictByType(tickets, formData.TicketType).price
          }
          closeModal={() => setOpenModal(false)}></TradeModal>
      )}
    </div>
  );
};

export default CheckIn;
