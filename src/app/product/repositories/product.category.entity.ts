import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity('product_category')
export class ProductCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'varchar' })
    category_id: string;

    @Column({ type: 'varchar', length: 100, default: 'NA' })
    category_name: string;

    @Column({ type: 'varchar' })
    sub_category_id: string;

    @Column({ type: 'varchar', length: 100, default: 'NA' })
    sub_category_name: string;

    @Column({ type: 'varchar', length: 200, default: 'NA' })
    sub_category_description: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({ type: 'bigint', nullable: true })
    updated_on: number;

    @Column({ type: 'enum', enum: Status, default: Status.NA })
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
