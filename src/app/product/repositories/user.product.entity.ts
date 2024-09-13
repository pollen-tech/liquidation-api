import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Status } from 'src/common/enums/common.enum';

@Entity('user_product')
export class UserProductEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid' })
	user_id: string;

	@Column({ type: 'uuid' })
	product_id: string;

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