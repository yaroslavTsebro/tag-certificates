import React, { useContext } from "react";
import { GiftCertificate } from "../../../types/gift-certeficates/GiftCertificates";
import style from "./Card.module.scss";
import Container from "../Container/Container";
import Highlighted from "../Highlighted/Highlighted";
import Button from "../Button/Button";
import { Context } from "../../../main";

const Card: React.FC<{ certificate: GiftCertificate }> = ({ certificate }) => {
  const { certificates } = useContext(Context)
  
  async function handleDelete() {
    try {
      await certificates.delete(certificate.id);
      await certificates.getAll();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className={style.container}>
      <Container.Body>
        <Container.Row>
          <div className={style.code}>
            code:<Highlighted>{certificate.code}</Highlighted>
          </div>
          <div className={style.used}>
            used:
            <Highlighted.Small>
              {certificate.used}/{certificate.maximumUsage}
            </Highlighted.Small>
          </div>
        </Container.Row>
        <Container.Row>
          <div className={style.tags}>
            {certificate.tags && certificate.tags.length > 0 && "tags: "}
            {certificate.tags &&
              certificate.tags.length > 0 &&
              certificate.tags.map((tag) => (
                <Highlighted.Small
                  className={style.tag}
                  key={`${tag.id}|${certificate.id}`}
                >
                  {tag.name}
                </Highlighted.Small>
              ))}
          </div>
          <div className={style.creator}>
            creator ID:
            <Highlighted.Small>{certificate.creatorId}</Highlighted.Small>
          </div>
        </Container.Row>
        <Container.Row className={style.actions}>
          <Button onClick={handleDelete} style="red">
            Delete
          </Button>
          <Button>Update</Button>
          <Button style="green">Use</Button>
        </Container.Row>
      </Container.Body>
    </Container>
  );
};

export default Card;
