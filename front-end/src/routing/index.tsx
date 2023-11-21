import { createBrowserRouter } from "react-router-dom";
import Main from "../components/pages/Main/Main";
import Login from "../components/Login/Login";
import CertificatePage from "../components/pages/CertificatePage/CertificatePage";
import Layout from "../components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: "login",
    element: <Login isLoginProp={true} />,
  },
  {
    path: "register",
    element: <Login isLoginProp={false} />,
  },
  { path: "/:id", element: <CertificatePage /> },
]);
