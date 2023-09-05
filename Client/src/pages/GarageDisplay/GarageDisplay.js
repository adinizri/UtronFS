import { useEffect, useState } from "react";
import { SERVER_ADRESS } from "../../consts";
import axios from "axios";

const GarageDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_ADRESS}/api/Garage/garageStatus`)
      .then((response) => {
        setData(response.data); // Store the response data in the 'data' state
        setLoading(false); // Set loading to false when the data is received
      })
      .catch((err) => {
        setError(err); // Set error state if there's an error
        setLoading(false); // Set loading to false when there's an error
      });
  }, []); // The empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data ? (
        <div>
          <h2>Garage Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};
export default GarageDisplay;
