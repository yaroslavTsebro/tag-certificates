import { Tag } from "../tag/Tag";
import { User } from "../user/User";

export class GiftCertificate {
  id: number;
  code: string;
  creator: User;
  creatorId: number;
  maximumUsage: number;
  used: number;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
