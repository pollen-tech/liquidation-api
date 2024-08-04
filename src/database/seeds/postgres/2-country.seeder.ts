import * as fs from 'fs';
import * as path from 'path';
import { CountryEntity } from 'src/app/country/infrastructure/repositories/country.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CountrySeeder implements Seeder {
    track = true;

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(CountryEntity);
        const count = await repository.count();
        if (count > 0) {
            return;
        }

        const countriesStr = fs.readFileSync(path.join(__dirname, '../seed-datas/countries.json'), 'utf8');
        const countries = JSON.parse(countriesStr);
        const data = countries.map((country) => {
            return {
                ...country,
                region_id: country.region_id && Number(country.region_id),
                subregion_id: country.subregion_id && Number(country.subregion_id),
                timezones: JSON.stringify(country.timezones),
                translations: JSON.stringify(country.translations),
            };
        });
        await repository.save(data);
    }
}
