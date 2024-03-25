import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookEntity } from 'src/modules/books/entities/book.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 20 })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ unique: false })
  password: string;

  @Column({ unique: false })
  active: boolean;

  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[];
}
