import React from "react";
import { GiftCertificate } from "../../../types/gift-certeficates/GiftCertificates";
import Card from "../Card/Card";
import style from "./CardList.module.scss";

const CardList: React.FC<{ certificates: GiftCertificate[] }> = ({
  certificates,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        {certificates.map((certificate) => (
          <Card key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
