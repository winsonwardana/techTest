import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
  },
]);

export default router;
