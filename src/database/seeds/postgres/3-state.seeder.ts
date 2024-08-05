import * as fs from 'fs';
import * as path from 'path';
import { StateEntity } from 'src/app/country/infrastructure/repositories/state.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class StateSeeder implements Seeder {
    track = true;

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(StateEntity);
        const count = await repository.count();
        if (count > 0) {
            return;
        }

        const statesStr = fs.readFileSync(path.join(__dirname, '../seed-datas/states.json'), 'utf8');
        const states = JSON.parse(statesStr);
        const data = states.map((state) => {
            return {
                ...state,
                country_id: Number(state.country_id),
            };
        });
        await repository.save(data);
    }
}
