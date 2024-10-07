import {Column, Entity, PrimaryColumn,} from 'typeorm';
import {Status} from '../../../common/enums/common.enum';

@Entity('compact_product_vw')
export class CompactProductEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    seq_no: number;

    @Column()
    pollen_sku: string;

    @Column()
    sku: string;

    @Column()
    brand_id: string;

    @Column()
    brand_name: string;

    @Column()
    lms_company_id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    status: Status;

}
