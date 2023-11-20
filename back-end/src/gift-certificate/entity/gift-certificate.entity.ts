import { BaseEntity } from '@app/common';
import User from 'src/auth/user/entity/user.entity';
import Tag from 'src/tag/entity/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
class GiftCertificate extends BaseEntity<GiftCertificate> {
  @Column({ length: 60, unique: true })
  code: string;

  @ManyToOne(() => User, (user) => user.giftCertificates, { lazy: true })
  @JoinColumn({ name: 'creatorId' })
  creator: Promise<User>;

  @Column({ nullable: true })
  creatorId: number;

  @Column()
  maximumUsage: number;

  @Column({ type: 'integer', default: 0 })
  used: number = 0;

  @ManyToMany(() => Tag, (tag) => tag.giftCertificates, { eager: true })
  @JoinTable()
  tags: Tag[];
}

export default GiftCertificate;
