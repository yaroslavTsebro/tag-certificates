import { PasswordOmitEntity } from '@app/common';
import GiftCertificate from 'src/gift-certificate/entity/gift-certificate.entity';
import Tag from 'src/tag/entity/tag.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import Token from '../../token/entity/token.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum AuthType {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
}

@Entity()
class User extends PasswordOmitEntity<User> {
  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 200, nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER.toString(),
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: AuthType,
    default: AuthType.EMAIL.toString(),
  })
  authType: AuthType;

  @Column({
    nullable: true,
  })
  oauthId: string;

  @JoinColumn()
  token: Token;

  @OneToMany(
    () => GiftCertificate,
    (giftCertificate) => giftCertificate.creator,
  )
  giftCertificates: GiftCertificate[];

  @OneToMany(() => Tag, (tag) => tag.creator)
  tags: Tag[];
}

export default User;
