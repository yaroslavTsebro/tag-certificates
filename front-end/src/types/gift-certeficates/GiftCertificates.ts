import { Tag } from "../tag/Tag";

export class GiftCertificate {
  code: string;
  creator: User | number;
  maximumUsage: number;
  used: number;
  tags: Tag[];
}
