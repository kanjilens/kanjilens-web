import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { appRoutes } from "./router";
import { AuthProvider } from "@features/iam/components/AuthProvider";
import { KanjiProvider } from "@features/kanji/components/KanjiProvider";

const router = createBrowserRouter(appRoutes);

const App = () => {
  return (
    <AuthProvider>
      <KanjiProvider>
        <RouterProvider router={router} />
      </KanjiProvider>
    </AuthProvider>
  );
};

export default App;
