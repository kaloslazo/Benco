import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false, nullable: true })
  author: string;

  @Column({ unique: false })
  title: string;

  @Column({ unique: false, nullable: true })
  description: string;

  @Column({ unique: false, nullable: true })
  cover: string;

  @Column({ unique: true })
  path: string;

  @ManyToOne(() => UserEntity, (user) => user.books)
  user: UserEntity;
}
