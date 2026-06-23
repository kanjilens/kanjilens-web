import type { RouteObject } from "react-router-dom";
import { Auth } from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const iamRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
];
