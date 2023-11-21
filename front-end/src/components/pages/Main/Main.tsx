import React, { useContext, useEffect } from "react";
import { Context } from "../../../main";
import Cookies from "js-cookie";
import CardList from "../../common/CardList/CardList";
import { observer } from "mobx-react-lite";

const Main: React.FC = () => {
  const { user, certificates } = useContext(Context);

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      user.checkAuth();
    }
    (async () => {
      await certificates.getAll();
    })();
  }, []);

  return (
    <div>
      {certificates.isLoading ? (
        <div>Loading...</div>
      ) : (
        <CardList certificates={certificates.certificates} />
      )}
    </div>
  );
};

export default observer(Main);
