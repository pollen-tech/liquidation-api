import { Entity, Column, Generated, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Status } from '../../../common/enums/common.enum';
import { BrandCategoryEntity } from './brand.category.entity';

@Entity('brand')
export class BrandEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	@Generated('increment')
	seq_no: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	image: string;

	@Column({ type: 'enum', enum: Status, default: Status.NA })
	status: Status;

	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;

	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date;

	@Column({ type: 'bigint', nullable: true })
	updated_on: number;

	@BeforeInsert()
	beforeCreate() {
		this.status = Status.ACTIVE;
	}

	@BeforeInsert()
	@BeforeUpdate()
	beforeCreateOrUpdate() {
		this.updated_on = Date.now();
	}

	//@OneToMany(() => BrandCategoryEntity, (category) => category.brand, { cascade: false, lazy: true })
	//brandCategories: Promise<BrandCategoryEntity[]>;
}