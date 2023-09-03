import { useState } from "react";
import { Input, Button } from "antd";
import "./Checkout.css";
const Checkout = () => {
  const [licensePlateID, setLicensePlateID] = useState("");

  return (
    <div className='checkout_container '>
      <h1>Check out vehicle</h1>
      <Input
        placeholder='license Plate ID'
        onChange={(e) => setLicensePlateID(e.target.value)}
      />
      <Button>Checkout vehicle </Button>
    </div>
  );
};
export default Checkout;
