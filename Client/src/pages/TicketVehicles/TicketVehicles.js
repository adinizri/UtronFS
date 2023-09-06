import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosHeaders, SERVER_ADRESS } from "../../consts";
import "./TicketVehicles.css"
const TicketVehicles=()=>{
    const [ticketType,setTicketType]= useState("");
    const [vehicles,setVehicles]=useState()
    const ticketTypes=["VIP","Value","Regular"];

const createOptions=()=>{
    const options=[];
    ticketTypes.map(ticketType=>options.push({value:ticketType}));
    console.log(options)
    return options;
}
const onChange = (value) => {
  console.log(`selected ${value}`);
  setTicketType(value)
};

useEffect(() => {
   async function fetchVehicles(){
   const resualt=await axios.get(`${SERVER_ADRESS}/api/Garage/ticketParkingCars/${ticketType}`,{headers:AxiosHeaders
    })
    setVehicles(resualt.data)
   }
   fetchVehicles()
}, [ticketType]);



    return(
    <div className="container">
      <h2>Show ticket vehicles</h2>
      <Select
        showSearch
        placeholder="Select ticket type"
        onChange={onChange}
        options={createOptions()}
        style={{ width: 200 }} // Adjust the width as needed
      />
      { vehicles&&<><div>vehicles:</div><div>{vehicles.map(vehicle=><p key={vehicle}>{vehicle}</p>)}</div></>}
    </div>)

}
export default TicketVehicles;