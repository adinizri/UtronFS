import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='home-page-container'>
      <h1 className='page-header'>Wellcome to the Garage</h1>
      <div>
        <Button className='custom-button' onClick={() => navigate("/CheckIn")}>Check In Vehicle</Button>
        <Button className='custom-button' onClick={() => navigate("/Checkout")}>Check Out Vehicle</Button>
        <Button className='custom-button' onClick={() => navigate("/GarageDisplay")}>Garage Display</Button>
        <Button className='custom-button' onClick={() => navigate("/insertFive")}>Insert Five</Button>
        <Button className='custom-button' onClick={() => navigate("/TicketVehicles")}>Ticket Vehicles</Button>
      </div>
    </div>
  );
};

export default HomePage;
