import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  trackingNumber: string;

  @Column({ default: 'pending' }) // pending, shipped, delivered, canceled
  status: string;

  @Column()
  destination: string;

  @CreateDateColumn()
  createdAt: Date;
}
