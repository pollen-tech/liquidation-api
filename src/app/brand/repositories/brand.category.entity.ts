import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { BrandEntity } from './brand.entity';

@Entity('brand_category')
export class BrandCategoryEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'brand_id', type: 'uuid' })
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
	updated_on: number;

	@BeforeInsert()
	@BeforeUpdate()
	beforeCreateOrUpdate() {
		this.updated_on = Date.now();
	}

	@Column({ type: 'enum', enum: Status, default: Status.NA })
	status: Status;

	//@ManyToOne(() => BrandEntity, (brand) => brand.brandCategories, { onDelete: 'CASCADE', lazy: true })
	//brand: Promise<BrandEntity>;
}