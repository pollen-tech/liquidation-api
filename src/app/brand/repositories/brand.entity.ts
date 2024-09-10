import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity('brands')
export class BrandEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	category_id: string;

	@Column()
	category_name: string;

	@Column()
	sub_category_id: string;

	@Column()
	sub_category_name: string;

	@Column()
	image: string;

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.NA,
	})
	status: Status;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	deleted_at: Date;
}