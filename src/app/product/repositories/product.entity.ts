import {
	Entity,
	Column,
	Generated,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity('product')
export class ProductEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	@Generated('increment')
	seq_no: number;

	@Column()
	pollen_sku: string;

	@Column()
	sku: string;

	@Column({ name: 'brand_id', type: 'uuid' })
	brand_id: string;

	@Column({ type: 'uuid' })
	lms_company_id: string;

	@Column()
	name: string;

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
		this.pollen_sku = 'P' + this.seq_no;
	}

	@BeforeInsert()
	@BeforeUpdate()
	beforeCreateOrUpdate() {
		this.updated_on = Date.now();
	}
}
