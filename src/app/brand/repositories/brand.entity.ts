import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';

@Entity()
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

	@Column({ nullable: true })
	image: string;

	@Column()
	status: Status;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	deleted_at: Date;
}