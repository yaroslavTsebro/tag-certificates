import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { store } from "../../../main";
import { GiftCertificate } from "../../../types/gift-certeficates/GiftCertificates";
import GiftCertificateService from "../../../http/service/GiftCertificatesService";

const CertificatePage = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [certificate, setCertificate] = useState<GiftCertificate>();

  useEffect(() => {
    (async () => {
      await getGiftCertificateById();
    })();
    setIsLoading(false);
  }, []);

  async function getGiftCertificateById() {
    try {
      const response = await GiftCertificateService.getById(id);
      console.log(response);
      setCertificate(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{certificate.id}</div>
          <div>{certificate.code}</div>
        </div>
      )}
    </div>
  );
};

export default CertificatePage;
