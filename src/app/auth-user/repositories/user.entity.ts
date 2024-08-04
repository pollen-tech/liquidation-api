import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    pollen_pass_id: number;

    @Column({ length: 50 })
    first_name: string;

    @Column({ length: 50 })
    last_name: string;

    @Column()
    country_code: number;

    @Column()
    phone_no: number;

    @Column({ default: false })
    phone_verified: boolean;

    @Column({ length: 200 })
    email: string;

    @Column()
    auth_ref_id: string;

    @Column({ type: 'uuid' })
    auth_id: string;

    @Column()
    channel: string;

    @Column()
    status: Status;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
