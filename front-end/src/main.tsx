import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/style.css";
import Store from "./context/UserStore.ts";

interface State {
  store: Store;
}

export const store = new Store();

export const Context = createContext<State>({
  store,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        store,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
