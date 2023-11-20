import React, { FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./main";
import Cookies from "js-cookie";
import { GiftCertificate } from "./types/gift-certeficates/GiftCertificates";
import GiftCertificateService from "./http/service/GiftCertificatesService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [certeficates, setCerteficates] = useState<GiftCertificate[]>([]);

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      store.checkAuth();
    }
  }, []);

  async function getGiftCertificates() {
    try {
      const response = await GiftCertificateService.getAll();
      console.log(response);
      setCerteficates(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1> */}
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getGiftCertificates}>Get certeficates</button>
      </div>
      {certeficates.map((certificate) => (
        <div key={certificate.code}>
          <div>{certificate.maximumUsage}</div>
          <div>{certificate.code}</div>
          {certificate.tags.map((certificate) => (
            <div key={certificate.id}>
              <div>{certificate.id}</div>
              <div>{certificate.name}</div>
            </div>
          ))}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default observer(App);
