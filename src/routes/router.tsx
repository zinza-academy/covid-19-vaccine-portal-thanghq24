import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Main from "../pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Main />}
    ]
  }
]);

const AppRouter = () =>  <RouterProvider router={router} />

export default AppRouter





