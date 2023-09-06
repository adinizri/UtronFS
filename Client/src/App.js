import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./pages/CheckOut/Checkout";
import CheckIn from "./pages/CheckIn/CheckIn";
import GarageDisplay from "./pages/GarageDisplay/GarageDisplay";
import InsertFive from "./pages/InsertFive/InsertFive";

import TicketVehicles from "./pages/TicketVehicles/TicketVehicles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Checkout",
    element: <Checkout />,
  },
  {
    path: "/CheckIn",
    element: <CheckIn />,
  },
  {
    path: "/GarageDisplay",
    element: <GarageDisplay />,
  },
  {
    path: "/InsertFive",
    element: <InsertFive />,
  },
  {
    path: "/TicketVehicles",
    element: <TicketVehicles />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
