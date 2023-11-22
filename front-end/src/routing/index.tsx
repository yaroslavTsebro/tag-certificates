import { createBrowserRouter } from "react-router-dom";
import Main, { loadCertificates } from "../components/pages/CertificatesPage/CertificatesPage";
import Login from "../components/Login/Login";
import CertificatePage from "../components/pages/CertificatePage/CertificatePage";
import Layout from "../components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
        loader: loadCertificates,
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
