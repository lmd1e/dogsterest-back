import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dogs')
export class DogEntity {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'text', unique: true })
  name: string; 

  @Column({ type: 'text' })
  link: string; 

  @Column({ type: 'int', default: 0})
  likes: number;
}