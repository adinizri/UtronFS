import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate();
  const buttons = [
    {
      onClick: () => navigate("/CheckIn"),
      text: "Check In Vehicle",
    },
    {
      onClick: () => navigate("/Checkout"),
      text: "  Check Out Vehicle",
    },

    {
      onClick: () => navigate("/GarageDisplay"),
      text: "Garage Display",
    },
    {
      onClick: () => navigate("/insertFive"),
      text: "Insert Five vehicles",
    },
    {
      onClick: () => navigate("/TicketVehicles"),
      text: "Ticket Vehicles",
    },
  ];
  return (
    <div className='home-page-container'>
      <h1 className='page-header'>Welcome to the Garage</h1>

      <div className='button-container'>
        {buttons.map((buttonData) => (
          <Button
            className={"custom-button"}
            onClick={buttonData.onClick}>
            {buttonData.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
