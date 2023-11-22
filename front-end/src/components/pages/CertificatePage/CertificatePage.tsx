import { useRouteLoaderData, Await, defer } from "react-router-dom";
import GiftCertificateService from "../../../http/service/GiftCertificatesService";
import Card from "../../common/Card/Card";
import { GiftCertificate } from "../../../types/gift-certeficates/GiftCertificates";

const CertificatePage = () => {
  const certificate = useRouteLoaderData("certificate-detail") as GiftCertificate;

  return (
    <Await resolve={certificate}>
      {(loadedEvent) => <Card certificate={loadedEvent} />}
    </Await>
  );
};

export default CertificatePage;

export async function loadCertificate(id: string) {
  return (await GiftCertificateService.getById(id)).data;
}

export async function loader({ params }) {
  const id = params.eventId;

  return defer({
    certificate: await loadCertificate(id),
  });
}
