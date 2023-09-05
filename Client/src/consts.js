import axios from "axios";

export const SERVER_ADRESS = "https://localhost:7074";
export const vehiclesType = [
  "Motorcycle",
  "Private",
  "Crossover",
  "SUV",
  "Van",
  "truck",
];

export const AxiosHeaders = {
  "Content-Type": "application/json",
};

export const vehicleClass = (
  await axios.get(`${SERVER_ADRESS}/api/Garage/vehicleClasses`, {
    headers: AxiosHeaders,
  })
).data;

export const tickets = (
  await axios.get(`${SERVER_ADRESS}/api/Garage/Tickets`, {
    headers: AxiosHeaders,
  })
).data;
