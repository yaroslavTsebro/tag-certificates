import { BaseEntity } from '@app/common';
import User from 'src/auth/user/entity/user.entity';
import GiftCertificate from 'src/gift-certificate/entity/gift-certificate.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
class Tag extends BaseEntity<Tag> {
  @Column({ length: 60, unique: true })
  name: string;

  @ManyToMany(() => GiftCertificate, (certificate) => certificate.tags, {
    lazy: true,
  })
  giftCertificates: Promise<GiftCertificate[]>;

  @Column({ nullable: true })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.tags, {
    lazy: true,
  })
  @JoinColumn({ name: 'creatorId' })
  creator: Promise<User>;
}

export default Tag;
