import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    account_id: number;

    @Column()
    name: string;

    @Column()
    company_type_id: number;

    @Column()
    country_id: number;

    @Column()
    country_name: string;

    @Column()
    liquidate_unit_id: number;

    @Column()
    liquidate_unit_name: string;

    @Column()
    status: Status;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
