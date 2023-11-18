import { GiftCertificate } from "../gift-certeficates/GiftCertificates";

export class Tag {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  giftCertificates?: GiftCertificate[];
  creator: User | number;
}