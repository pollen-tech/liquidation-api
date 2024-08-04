import * as fs from 'fs';
import * as path from 'path';
import { RegionEntity } from 'src/app/country/infrastructure/repositories/region.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class RegionSeeder implements Seeder {
    track = true;

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(RegionEntity);
        const count = await repository.count();
        if (count > 0) {
            return;
        }

        const regionsStr = fs.readFileSync(path.join(__dirname, '../seed-datas/regions.json'), 'utf8');
        const regions = JSON.parse(regionsStr);
        const data = regions.map((region) => {
            return {
                ...region,
                translations: JSON.stringify(region.translations),
            };
        });
        await repository.save(data);
    }
}
