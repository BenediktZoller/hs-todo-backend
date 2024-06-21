import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;
}
