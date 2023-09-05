export const SERVER_ADRESS = "https://localhost:7074";
export const vehiclesType = [
  "Motorcycle",
  "Private",
  "Crossover",
  "SUV",
  "Van",
  "truck",
];

export const AxiosHeaders = {
  "Content-Type": "application/json",
};

export const vehicleClass = {
  A: { className: "A", vehicles: ["Motorcycle", "Private", "Crossover"] },
  B: { className: "B", vehicles: ["SUV", "Van"] },
  C: { className: "C", vehicles: ["truck"] },
};

export const tickets = {
  VIP: {
    type: "VIP",
    Price: 200,
    vehicleClass: [vehicleClass.A, vehicleClass.B, vehicleClass.C],
  },
  Value: {
    type: "Value",
    Price: 100,
    vehicleClass: [vehicleClass.A, vehicleClass.B],
  },
  Regular: {
    type: "Regular",
    Price: 50,
    vehicleClass: [vehicleClass.A],
  },
};
