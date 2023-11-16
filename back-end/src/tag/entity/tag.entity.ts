import { BaseEntity } from '@app/common';
import User from 'src/auth/user/entity/user.entity';
import GiftCertificate from 'src/gift-certificate/entity/gift-certificate.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
class Tag extends BaseEntity<Tag> {
  @Column({ length: 60, unique: true })
  name: string;

  @ManyToMany(() => GiftCertificate, (certificate) => certificate.tags)
  giftCertificates: GiftCertificate[];

  @ManyToOne(() => User, (user) => user.tags)
  creator: User;
}

export default Tag;
