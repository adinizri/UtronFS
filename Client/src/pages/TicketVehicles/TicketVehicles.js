import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosHeaders, SERVER_ADRESS } from "../../consts";
import "./TicketVehicles.css";

const TicketVehicles = () => {
  const [ticketType, setTicketType] = useState("");
  const [vehicles, setVehicles] = useState(null); // Initialize as null
  const ticketTypes = ["VIP", "Value", "Regular"];

  const createOptions = () => {
    return ticketTypes.map((ticketType) => ({ value: ticketType }));
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setTicketType(value);
  };

  useEffect(() => {
    async function fetchVehicles() {
      if (ticketType) {
        const result = await axios.get(`${SERVER_ADRESS}/api/Ticket/ticketParkingCars/${ticketType}`, {
          headers: AxiosHeaders,
        });
        setVehicles(result.data);
      }
    }
    fetchVehicles();
  }, [ticketType]);

  return (
    <div className="container">
      <h2>Show ticket vehicles</h2>
      <div className="select-container">
        <Select
          showSearch
          placeholder="Select ticket type"
          onChange={onChange}
          options={createOptions()}
          style={{ width: 200 }} // Adjust the width as needed
        />
      </div>
      <div className="vehicles-container">
        {vehicles && (
          <>
            <div className="vehicles-label">Vehicles:</div>
            <div className="vehicle-list">
              {vehicles.map((vehicle) => (
                <p key={vehicle}>{vehicle}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketVehicles;
