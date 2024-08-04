import * as fs from 'fs';
import * as path from 'path';
import { SubregionEntity } from 'src/app/country/infrastructure/repositories/subregion.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SubregionSeeder implements Seeder {
    track = true;

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(SubregionEntity);
        const count = await repository.count();
        if (count > 0) {
            return;
        }

        const subregionsStr = fs.readFileSync(path.join(__dirname, '../seed-datas/subregions.json'), 'utf8');
        const subregions = JSON.parse(subregionsStr);
        const data = subregions.map((subregion) => {
            return {
                ...subregion,
                region_id: Number(subregion.region_id),
                translations: JSON.stringify(subregion.translations),
            };
        });
        await repository.save(data);
    }
}
