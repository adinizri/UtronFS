import { tickets, vehicleClass } from "../consts";

export function getVehicleClassByVehicle(vehicleClass, vehicle) {
  let className = "";
  console.log(vehicleClass);
  Object.entries(vehicleClass).map((value) => {
    if (value[1].includes(vehicle)) className = value[0];
  });
  return className;
}

export const getTicketFromDictByType = (tickets, ticketType) => {
  let ticket = Object.entries(tickets).filter(
    (value) => value[1].type == ticketType
  );
  return ticket[0][1];
};
