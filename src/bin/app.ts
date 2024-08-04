import { argv } from 'process';
import { install } from 'source-map-support';
import { revertMigration, runMigrations, runSeeds } from 'src/database/migration';
install();

async function run() {
    if (argv.includes('migration:run')) {
        await runMigrations();
        return;
    }
    if (argv.includes('migration:revert')) {
        await revertMigration();
        return;
    }
    if (argv.includes('seed:run')) {
        await runSeeds();
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const main = require('../main');
    await main.bootstrap();
}
run().then();
