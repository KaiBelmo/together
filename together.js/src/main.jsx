import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/index";
import Error from "./routes/error";
import Room from "./routes/room";
import "./index.css";
import About from "./routes/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <Error />,
  }, 
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  }, 
  {
    path: "/room/:roomid",
    element: <Room />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
