import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MisApuntesPage from "../pages/MisApuntesPage/MisApuntesPage";
import RecomendadosPage from "../pages/RecomendadosPage/RecomendadosPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/misApuntes/:id", element: <MisApuntesPage /> },
      { path: "/recomendados/:id", element: <RecomendadosPage /> },
    ],
  },
]);
