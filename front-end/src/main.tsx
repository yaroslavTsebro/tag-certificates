import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./style/style.scss";
import Store from "./context/UserStore.ts";
import { router } from "./routing/index.tsx";
import { RouterProvider } from "react-router-dom";
import GiftCertificateStore from "./context/CertificatesStore.ts";

interface State {
  user: Store;
  certificates: GiftCertificateStore;
}

export const user = new Store();
export const certificates = new GiftCertificateStore();

export const Context = createContext<State>({
  user,
  certificates,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user,
        certificates,
      }}
    >
      <RouterProvider router={router} />
    </Context.Provider>
  </React.StrictMode>
);
