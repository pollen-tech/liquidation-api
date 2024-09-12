import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { BrandCategoryEntity } from './brand.category.entity';

@Entity('brands')
export class BrandEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: 0 })
	seq_no: number;

	@Column()
	brand_name: string;

	@Column({ nullable: true })
	brand_image: string;

	@Column({ type: 'enum', enum: Status, default: Status.NA })
	status: Status;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date;

	@Column({ type: 'bigint', nullable: true })
	updated_on: string;

	@OneToMany(() => BrandCategoryEntity, (category) => category.brand, { cascade: true, lazy: true })
	brandCategories: Promise<BrandCategoryEntity[]>;
}

//@Entity('brands')
//export class BrandEntity {
//	@PrimaryGeneratedColumn()
//	id: string;

//	@Column()
//	seq_no: number;

//	@Column()
//	name: string;

//	@Column()
//	category_id: string;

//	@Column()
//	category_name: string;

//	@Column()
//	sub_category_id: string;

//	@Column()
//	sub_category_name: string;

//	@Column()
//	image: string;

//	@Column({
//		type: 'enum',
//		enum: Status,
//		default: Status.NA,
//	})
//	status: Status;

//	@CreateDateColumn({ type: 'timestamptz' })
//	created_at: Date;

//	@UpdateDateColumn({ type: 'timestamptz' })
//	updated_at: Date;

//	@DeleteDateColumn({ type: 'timestamptz' })
//	deleted_at: Date;

//	@Column({ type: 'bigint' })
//	updated_on: string;
//}