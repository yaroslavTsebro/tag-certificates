import { BaseEntity } from '@app/common';
import User from 'src/auth/user/entity/user.entity';
import Tag from 'src/tag/entity/tag.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
class GiftCertificate extends BaseEntity<GiftCertificate> {
  @Column({ length: 60, unique: true })
  code: string;

  @ManyToOne(() => User, (user) => user.giftCertificates)
  creator: User;

  @Column()
  maximumUsage: number;

  @Column()
  used: number;

  @ManyToMany(() => Tag, (tag) => tag.giftCertificates)
  @JoinTable()
  tags: Tag[];
}

export default GiftCertificate;
