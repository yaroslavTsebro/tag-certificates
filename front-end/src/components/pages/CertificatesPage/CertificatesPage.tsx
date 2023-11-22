import CardList from "../../common/CardList/CardList";
import { observer } from "mobx-react-lite";
import GiftCertificateService from "../../../http/service/GiftCertificatesService";
import { defer, useLoaderData } from "react-router-dom";
import { GiftCertificate } from "../../../types/gift-certeficates/GiftCertificates";

const CertificatesPage: React.FC = () => {
  const certificates = useLoaderData() as GiftCertificate[];

  return (
    <div>
      <CardList certificates={certificates} />
    </div>
  );
};

export default observer(CertificatesPage);

export async function loadCertificates(): Promise<GiftCertificate[]> {
  return (await GiftCertificateService.getAll()).data;
}

export function loader() {
  return defer({
    certificates: loadCertificates(),
  });
}
