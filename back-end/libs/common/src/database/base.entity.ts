import { instanceToPlain } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  toJSON(): {} {
    const record = instanceToPlain(this);

    // Remove all double underscores `__` from all properties when serializing object
    const cleanUnderscoresProperties = (obj: object): void => {
      for (const [key, val] of Object.entries(obj)) {
        if (key.startsWith('__') && key.endsWith('__')) {
          const newKey = key.substring(2, key.length - 2);
          obj[newKey] = obj[key];
          delete obj[key];
        } else if (typeof val === 'object') {
          if (val != null) {
            cleanUnderscoresProperties(val);
          }
        }
      }
    };

    if (record != null) {
      cleanUnderscoresProperties(record);
    }

    return record;
  }
}
