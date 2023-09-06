import { useEffect, useState } from "react";
import { Card, Spin, Row, Col } from "antd";
import { SERVER_ADRESS } from "../../consts";
import axios from "axios";
import "./GarageDisplay.css"; // Import your CSS file
import CardGrid from "../../SharedComponent/CardGrid/CardGrid";

const GarageDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_ADRESS}/api/Garage/garageStatus`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='garage-display-container'>
      <div className='garage-display-content'>
        <h2 className='centered-header'>Garage Data</h2>
        {loading ? (
          <Spin size='large' />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : data ? (
          data.length > 0 ? (
            <CardGrid data={data}></CardGrid>
          ) : (
            <div>The Garage is Empthy</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default GarageDisplay;
