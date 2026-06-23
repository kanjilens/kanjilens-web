import type { RouteObject } from "react-router-dom";

import NotFoundPage from "./pages/NotFound";
import About from "./pages/About";

import {
  iamRoutes,
  dashboardRoutes,
} from "@features/routes";

import Layout from "@components/layout/Layout";
import ProtectedRouteWrapper from "@features/iam/components/ProtectedRouteWrapper";

export const appRoutes: RouteObject[] = [
  {
    element: <ProtectedRouteWrapper />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [...dashboardRoutes],
      },
    ],
  },
  {
    element: <Layout guestUser />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/about", element: <About /> },
      ...iamRoutes,
    ],
  },
];
