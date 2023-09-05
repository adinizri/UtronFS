import { tickets, vehicleClass } from "../consts";

export function getVehicleClassByVehicle(vehicle) {
  let className = "";
  Object.entries(vehicleClass).map((value) => {
    if (value[1].vehicles.includes(vehicle)) className = value[0];
  });
  return className;
}

export const getTicketFromDictByType = (ticketType) => {
  let ticket = Object.entries(tickets).filter(
    (value) => value[1].type == ticketType
  );
  return ticket[0][1];
};
