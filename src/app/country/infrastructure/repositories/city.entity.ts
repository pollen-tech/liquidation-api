import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../../common/enums/common.enum';

@Entity('city')
export class CityEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    status: Status;

    //
    //
    // @ManyToOne((type) => StateEntity, {
    //     onUpdate: 'RESTRICT',
    //     onDelete: 'RESTRICT',
    //     nullable: false,
    // })
    // @JoinColumn({ name: 'state_id', foreignKeyConstraintName: 'cities_ibfk_1' })
    // @Index('idx_16386_cities_test_ibfk_1')
    // state: StateEntity;
    //
    //
    //
    // @ManyToOne((type) => CountryEntity, {
    //     onDelete: 'RESTRICT',
    //     onUpdate: 'RESTRICT',
    //     nullable: false,
    // })
    // @JoinColumn({ name: 'country_id', foreignKeyConstraintName: 'cities_ibfk_2' })
    // @Index('idx_16386_cities_test_ibfk_2')
    // country: CountryEntity;
    //
}
