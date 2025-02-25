import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('LEADS')
export class Leads {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'TENANT_ID', type: 'uniqueidentifier' })
  tenantId?: string;

  @Column({ name: 'SALESPERSON_ID', type: 'uniqueidentifier' })
  salespersonId?: string;

  @Column({ name: 'CREATED_BY', type: 'uniqueidentifier' })
  created_by?: string;

  @Column({ name: 'COMPANY' })
  company?: string;

  @Column({ name: 'FIRSTNAME', nullable: true })
  firstName?: string;

  @Column({ name: 'LASTNAME', nullable: true })
  lastName?: string;

  @Column({ name: 'TITLE', nullable: true })
  title?: string;

  @Column({ name: 'EMAIL', nullable: true })
  email?: string;

  @Column({ name: 'PHONE', nullable: true })
  phone?: string;

  @Column({ name: 'FAX', nullable: true })
  fax?: string;

  @Column({ name: 'MOBILE', nullable: true })
  mobile?: string;

  @Column({ name: 'WEBSITE', nullable: true })
  website?: string;

  @Column({ name: 'LEAD_SOURCE', nullable: true })
  leadSource?: string;

  @Column({ name: 'LEAD_STATUS', nullable: true })
  leadStatus?: string;

  @Column({ name: 'INDUSTRY', nullable: true })
  industry?: string;

  @Column({ name: 'NO_OF_EMPLOYEES', nullable: true })
  noOfEmployees?: string;

  @Column({ name: 'ANNUAL_REVENUE', nullable: true })
  annualRevenue?: string;

  @Column({ name: 'RATING', nullable: true })
  rating?: string;

  @Column({ name: 'EMAIL_OPT_OUT', nullable: true })
  emailOptOut?: number;

  @Column({ name: 'SECONDARY_EMAIL', nullable: true })
  secondaryEmail?: string;

  @Column({ name: 'TWITTER', nullable: true })
  twitter?: string;

  @Column({ name: 'STREET', nullable: true })
  street?: string;

  @Column({ name: 'CITY', nullable: true })
  city?: string;

  @Column({ name: 'STATE', nullable: true })
  state?: string;

  @Column({ name: 'ZIPCODE', nullable: true })
  zipCode?: string;

  @Column({ name: 'COUNTRY', nullable: true })
  country?: string;

  @Column({ name: 'DESCRIPTION', nullable: true })
  description?: string;

  @Column({ name: 'CREATED_AT', type: 'datetime', default: () => 'GETDATE()' })
  createdAt?: Date;

  @Column({ name: 'UPDATED_AT', type: 'datetime', default: () => 'GETDATE()' })
  updatedAt?: Date;
}
