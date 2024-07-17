import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('card_type')
export class CardType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;
}
