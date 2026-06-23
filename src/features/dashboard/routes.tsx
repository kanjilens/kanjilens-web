import Dashboard from ".";

const routes = [
  "/home",
  "/discovered",
  "/settings",
  "/library",
];

export const dashboardRoutes = routes.map((route) => {
  return {
    path: route,
    element: <Dashboard />,
  };
});
