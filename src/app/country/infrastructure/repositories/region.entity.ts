import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('regions')
export class RegionEntity {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    translations: string;

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at: Date;

    @Column({ default: true })
    flag: boolean;

    @Column({
        type: 'varchar',
        length: 255,
        comment: 'Rapid API GeoDB Cities',
        nullable: true,
    })
    wikidataid: string;
}
