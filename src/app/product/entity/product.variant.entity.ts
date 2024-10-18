import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {Status} from '../../../common/enums/common.enum';

@Entity('product_variant')
export class ProductVariantEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_id: string;

    @Column()
    variant_sku: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    updated_on: number;

    @Column()
    status: Status;

    @BeforeInsert()
    beforeCreate() {
        this.status = Status.ACTIVE;
    }

    @BeforeInsert()
    @BeforeUpdate()
    beforeCreateOrUpdate() {
        this.updated_on = Date.now();
    }
}
