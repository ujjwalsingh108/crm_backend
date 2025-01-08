import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('USERS')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn({ name: 'TENANT_ID' })
  tenant?: Tenant;

  @Column({ name: 'TENANT_ID', type: 'uniqueidentifier' })
  tenantId?: string;

  @Column({ name: 'FIRST_NAME' })
  firstName?: string;

  @Column({ name: 'MIDDLE_NAME' })
  middleName?: string;

  @Column({ name: 'LAST_NAME' })
  lastName?: string;

  @Column({ name: 'EMAIL', unique: true })
  email?: string;

  @Column({ name: 'PASSWORD' })
  password?: string;

  @Column({ name: 'PHONE', nullable: true })
  phone?: string;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive?: boolean;

  @Column({ name: 'ROLE' })
  role?: string;

  @Column({ name: 'CREATED_AT', type: 'datetime', default: () => 'GETDATE()' })
  createdAt?: Date;

  @Column({ name: 'UPDATED_AT', type: 'datetime', default: () => 'GETDATE()' })
  updatedAt?: Date;
}
