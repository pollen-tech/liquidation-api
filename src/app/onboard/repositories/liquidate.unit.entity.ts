import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('liquidate_unit')
export class LiquidateUnitEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: string;
}
