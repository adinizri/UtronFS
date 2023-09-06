import { useState } from "react";
import { Input, Button } from "antd";
import "./Checkout.css";
import axios from "axios";
import { SERVER_ADRESS } from "../../consts";
import Swal from "sweetalert2";
const Checkout = () => {
  const [licensePlateID, setLicensePlateID] = useState("");
  const handleCheckout = async () => {
    if (licensePlateID !== "") {
      try {
        const response = await axios.delete(
          `${SERVER_ADRESS}/api/Garage/checkout/${licensePlateID}`
        );
        if (response.status === 200) {
          Swal.fire({
            title: "success",
            text: "The vehicle is checked out",
            icon: "success",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "license Plate ID doesnt exist",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter license Plate ID",
        icon: "error",
      });
    }
  };
  return (
    <div className='checkout_container '>
      <h1>Check out vehicle</h1>
      <Input
        placeholder='license Plate ID'
        onChange={(e) => setLicensePlateID(e.target.value)}
      />
      <Button onClick={handleCheckout}>Checkout vehicle </Button>
    </div>
  );
};
export default Checkout;
