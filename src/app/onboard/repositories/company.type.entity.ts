import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('company_type')
export class CompanyTypeEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: string;
}
