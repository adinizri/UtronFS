import { vehicleClass } from "../consts";

export function getVehicleClassByVehicle(vehicle) {
  let className = "";
  Object.entries(vehicleClass).map((value) => {
    if (value[1].vehicles.includes(vehicle)) className = value[0];
  });
  return className;
}
