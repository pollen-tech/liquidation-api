import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity('product_image')
export class ProductImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
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
