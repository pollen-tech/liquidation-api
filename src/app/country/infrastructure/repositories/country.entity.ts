import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../../common/enums/common.enum';

@Entity('country')
export class CountryEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    iso3: string;

    @Column()
    phone_code: string;

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at: Date;

    @Column()
    status: Status;
}
