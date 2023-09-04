import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Checkout from './pages/CheckOut/Checkout';
import CheckIn from './pages/CheckIn/CheckIn';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  }, {
    path: "/Checkout",
    element: <Checkout />,
  },
  {
    path: "/CheckIn",
    element: <CheckIn />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
