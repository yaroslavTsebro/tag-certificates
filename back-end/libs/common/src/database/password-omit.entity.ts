import { instanceToPlain } from 'class-transformer';
import { BaseEntity } from './base.entity';

export abstract class PasswordOmitEntity<T> extends BaseEntity<T> {
  constructor(entity: Partial<T>) {
    super(entity);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  toJSON(): {} {
    const obj = instanceToPlain(this);
    if (obj['password']) {
      delete obj['password'];
    }
    return obj;
  }
}
