import React, { useContext, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../Header/Header";
import Cookies from "js-cookie";
import { Context } from "../../main";

function RootLayout() {
  const { user } = useContext(Context);
  const navigation = useNavigation();

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      user.checkAuth();
    }
  }, []);

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
