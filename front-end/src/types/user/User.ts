import { GiftCertificate } from "../gift-certeficates/GiftCertificates";
import { Tag } from "../tag/Tag";

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  token: null;
  giftCertificates: GiftCertificate[];
  tags: Tag[];
}
