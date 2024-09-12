import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { BrandEntity } from './brand.entity';

@Entity('brand_category')
export class BrandCategoryEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid' })
	brand_id: string;

	@Column({ type: 'varchar' })
	category_id: string;

	@Column({ type: 'varchar', length: 100, default: 'NA' })
	category_name: string;

	@Column({ type: 'varchar' })
	sub_category_id: string;

	@Column({ type: 'varchar', length: 100, default: 'NA' })
	sub_category_name: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updated_at: Date;

	@Column({ type: 'timestamp', nullable: true })
	deleted_at: Date;

	@Column({ type: 'bigint', nullable: true })
	updated_on: bigint;

	@Column({ type: 'enum', enum: Status, default: Status.NA })
	status: Status;

	@ManyToOne(() => BrandEntity, (brand) => brand.brandCategories, { onDelete: 'CASCADE', lazy: true })
	brand: Promise<BrandEntity>;
}

////@Entity('brand_sub_categories')
//export class BrandSubCategoryEntity {
//	//@PrimaryGeneratedColumn('uuid')
//	//id: string;

//	@Column()
//	sub_category_id: string;

//	@Column()
//	sub_category_name: string;

//	@ManyToOne(() => BrandCategoryEntity, brandCategory => brandCategory.brandSubCategories)
//	brandCategory: BrandCategoryEntity;
//}