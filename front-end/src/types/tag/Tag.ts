import { GiftCertificate } from "../gift-certeficates/GiftCertificates";
import { User } from "../user/User";

export class Tag {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  giftCertificates?: GiftCertificate[];
  creator: User;
  creatorId: number;
}