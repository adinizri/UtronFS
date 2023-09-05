import { useEffect, useState } from "react";
import { AxiosHeaders, SERVER_ADRESS } from "../../consts";
import axios from "axios";

const InsertFive = () => {
  const [data, setData] = useState();
  const rand = Math.random() * 9999999999999;
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
        const resualts = await Promise.all(axiosRequests);
        setData(resualts);
      } catch (e) {
        console.log(e);
      }
    }
    insertFive();
  }, []);

  return <div>{data && JSON.stringify(data)}</div>;
};
export default InsertFive;
