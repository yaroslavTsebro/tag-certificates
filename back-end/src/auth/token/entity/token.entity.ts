import { BaseEntity } from '@app/common';
import User from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
class Token extends BaseEntity<Token> {
  @Column({ length: 200 })
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export default Token;
