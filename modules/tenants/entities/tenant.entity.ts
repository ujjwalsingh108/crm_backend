import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('TENANTS')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'INDUSTRY', nullable: true })
  industry: string;

  @Column({ name: 'PHONE' })
  phone: string;

  @Column({ name: 'EMAIL', unique: true })
  email: string;

  @Column({ name: 'WEBSITE', nullable: true })
  website: string;

  @Column({ name: 'LOGO_URL', nullable: true })
  logoUrl: string;

  @Column({
    name: 'CREATED_AT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'UPDATED_AT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;

  @Column({ name: 'TAX_ID', nullable: true })
  taxId: string;

  @Column({ name: 'PAN', nullable: true })
  pan: string;

  @Column({ name: 'CIN', nullable: true })
  cin: string;

  @Column({
    name: 'ANNUAL_REVENUE',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  annualRevenue: number;

  @Column({ name: 'NUMBER_OF_EMPLOYEES', nullable: true })
  numberOfEmployees: number;

  @Column({ name: 'CREATED_BY', nullable: true })
  createdBy: string;

  @Column({ name: 'UPDATED_BY', nullable: true })
  updatedBy: string;

  @Column({ name: 'NOTES', nullable: true })
  notes: string;

  @Column({ name: 'ADDRESS_ID', type: 'uniqueidentifier', nullable: true })
  addressID: string;
}

/**
 *
 *
 * state -> state master
 * country -> country master
 * pincode
 * tin ->  Tax identification number
 * gst
 */
