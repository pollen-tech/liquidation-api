import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { RegionEntity } from './region.entity';

@Entity('subregions')
export class SubregionEntity {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    translations: string;

    @ManyToOne((type) => RegionEntity, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        nullable: false,
    })
    @JoinColumn({
        name: 'region_id',
        foreignKeyConstraintName: 'subregion_continent_final',
    })
    @Index('idx_16418_subregion_continent')
    region: RegionEntity;

    @Column()
    region_id: number;

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
