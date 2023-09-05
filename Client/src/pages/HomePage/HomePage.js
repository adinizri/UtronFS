import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./HomePage.css";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='HomePage_container'>
      <h1>Wellcome to the Garage</h1>
      <div>
        <Button onClick={() => navigate("/CheckIn")}>check in vehicle </Button>
        <Button onClick={() => navigate("/Checkout")}>
          check out vehicle{" "}
        </Button>
        <Button onClick={() => navigate("/GarageDisplay")}>
          Garage Display{" "}
        </Button>
        <Button onClick={() => navigate("/insertFive")}>insert Five </Button>
      </div>
    </div>
  );
};
export default HomePage;
