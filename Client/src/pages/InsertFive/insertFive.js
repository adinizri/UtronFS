import { useEffect, useState } from "react";
import { AxiosHeaders, SERVER_ADRESS } from "../../consts";
import axios from "axios";
import CardGrid from "../../SharedComponent/CardGrid/CardGrid";
import "./InsertFive.css";

const InsertFive = () => {
  const [data, setData] = useState();

  const rand = Math.round(Math.random() * 99999999);
  const vehicles = [
    {
      VehicleClass: "A",
      Dimensions: {
        Height: 1,
        Width: 1,
        Length: 1,
      },
      Name: "Adi",
      LicensePlateID: (rand + 1).toString(),
      Phone: "000000000",
      TicketType: "Regular",
      VehicleType: "privet",
    },
    {
      VehicleClass: "A",
      Dimensions: {
        Height: 1,
        Width: 1,
        Length: 1,
      },
      Name: "Adi",
      LicensePlateID: (rand + 2).toString(),
      Phone: "000000000",
      TicketType: "Regular",
      VehicleType: "privet",
    },
    {
      VehicleClass: "A",
      Dimensions: {
        Height: 1,
        Width: 1,
        Length: 1,
      },
      Name: "Adi",
      LicensePlateID: (rand + 3).toString(),
      Phone: "000000000",
      TicketType: "Regular",
      VehicleType: "privet",
    },
    {
      VehicleClass: "A",
      Dimensions: {
        Height: 1,
        Width: 1,
        Length: 1,
      },
      Name: "Adi",
      LicensePlateID: (rand + 4).toString(),
      Phone: "000000000",
      TicketType: "Regular",
      VehicleType: "privet",
    },
    {
      VehicleClass: "A",
      Dimensions: {
        Height: 1,
        Width: 1,
        Length: 1,
      },
      Name: "Adi",
      LicensePlateID: (rand + 5).toString(),
      Phone: "000000000",
      TicketType: "Regular",
      VehicleType: "privet",
    },
  ];

  useEffect(() => {
    async function insertFive() {
      try {
        const axiosRequests = vehicles.map((vehicle) =>
          axios.post(
            `${SERVER_ADRESS}/api/Garage/checkIn`,
            vehicle,
            { headers: AxiosHeaders }
            // vehicle
          )
        );
        const resualts = (await Promise.all(axiosRequests)).map(
          (result) => result.data
        );
        setData(resualts);
        console.log(resualts);
      } catch (e) {
        console.log(e);
      }
    }
    insertFive();
  }, []);

  return (
    <div className='page-container'>
      <h1>New Vehicles in the Garage!</h1>
      <div className='cards-container'>
        {!data ? "Loading ..." : <CardGrid data={data} />}
      </div>
    </div>
  );
};
export default InsertFive;
