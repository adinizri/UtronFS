import { useEffect, useState } from "react";
import { Card, Spin, Row, Col } from "antd";
import { SERVER_ADRESS } from "../../consts";
import axios from "axios";
import "./GarageDisplay.css"; // Import your CSS file

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
          <Row gutter={16}>
            {data.map((item, index) =>
              data.length > 0 ? (
                <Col
                  span={4}
                  key={index}>
                  <Card
                    title={`vehicle ID: ${item.licensePlateID}`}
                    className='vehicle-card'>
                    {Object.keys(item).map((key) => (
                      <div key={key}>
                        <strong>{key}:</strong> {item[key]}
                      </div>
                    ))}
                  </Card>
                </Col>
              ) : (
                <div>The Garage is Empthy</div>
              )
            )}
          </Row>
        ) : null}
      </div>
    </div>
  );
};

export default GarageDisplay;
