import React, { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../page/Home";
import Shop from "../page/Shop";
import Cart from "../page/Cart";
import History from "../page/user/History";
import Checkout from "../page/Checkout";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import Layout from "../layout/Layout";
import LayoutUser from "../layout/LayoutUser";
import Payment from "../page/user/Payment";


const router = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/user",
    element: <LayoutUser />,
    children: [
      { path: 'history', element: <History /> },
      { path: 'payment', element: <Payment /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default AppRoutes;
