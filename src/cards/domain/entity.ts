import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { CardType } from '@/card-types/domain/entity';

@Entity('card')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column('int')
  hp: number;

  @ManyToOne(() => CardType)
  @JoinColumn({ name: 'type_id' })
  type: CardType;

  @Column({ length: 100 })
  ability: string;

  @Column('int')
  attack_power: number;

  @ManyToOne(() => CardType)
  @JoinColumn({ name: 'resistance_id' })
  resistance: CardType;

  @Column('int')
  resistance_point: number;

  @ManyToOne(() => CardType)
  @JoinColumn({ name: 'weakness_id' })
  weakness: CardType;

  @Column('int')
  weakness_point: number;

  @Column({ nullable: true })
  img_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
