import * as fs from 'fs';
import * as path from 'path';
import { CityEntity } from 'src/app/country/infrastructure/repositories/city.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CitySeeder implements Seeder {
    track = true;

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(CityEntity);
        const count = await repository.count();
        if (count > 0) {
            return;
        }

        const citiesStr = fs.readFileSync(path.join(__dirname, '../seed-datas/cities.json'), 'utf8');
        const cities = JSON.parse(citiesStr);
        await repository.save(cities, { chunk: 5000 });
    }
}
