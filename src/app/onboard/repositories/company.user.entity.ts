import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('company_user')
export class CompanyUserEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column({ type: 'uuid' })
    company_id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column()
    status: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
