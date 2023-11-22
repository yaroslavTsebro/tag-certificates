import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import HomePage from "./components/pages/Home/Home";
import RootLayout from "./components/layout/RootLayout";
import { tokenLoader } from "./utils/auth";
import CertificatesRootLayout from "./components/layout/CertificatesRootLayout/CertificatesRootLayout";
import CertificatesPage, {
  loader as certificatesLoader,
} from "./components/pages/CertificatesPage/CertificatesPage";
import CertificatePage from "./components/pages/CertificatePage/CertificatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "certificates",
        element: <CertificatesRootLayout />,
        children: [
          {
            index: true,
            element: <CertificatesPage />,
            loader: certificatesLoader,
          },
          {
            path: ":certificateId",
            id: "certificate",
            loader: certificatesLoader,
            children: [
              {
                index: true,
                element: <CertificatePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
