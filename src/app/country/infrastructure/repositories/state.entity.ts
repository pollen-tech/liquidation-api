import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { CountryEntity } from './country.entity';

@Entity('states')
export class StateEntity {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne((type) => CountryEntity, {
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        nullable: false,
    })
    @JoinColumn({
        name: 'country_id',
        foreignKeyConstraintName: 'country_region_final',
    })
    @Index('idx_16410_country_region')
    country: CountryEntity;

    @Column()
    country_id: number;

    @Column({ type: 'character', length: 2 })
    country_code: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    fips_code: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    iso2: string;

    @Column({ type: 'varchar', length: 191, nullable: true })
    type: string;

    @Column({ type: 'numeric', precision: 10, scale: 8, nullable: true })
    latitude: number;

    @Column({ type: 'numeric', precision: 11, scale: 8, nullable: true })
    longitude: number;

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
