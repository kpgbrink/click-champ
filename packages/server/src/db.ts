import {
    Connection,
    createConnection,
} from 'typeorm';
import entities from './entity';

export const createManagerAsync = (async () => {
    const connection = await createConnection({
        entities,
        type: 'postgres',
        url: process.env.CLICKCHAMP_TYPEORM_URL,
    });
    // Our way of being lazy: write only necessary migrations.
    // We get data into a good enough spot that the synchronization
    // can do the rest. Be sure that migrations throw errors
    // if they fail because otherwise the synchronization will
    // lose data.
    await connection.runMigrations();
    await connection.synchronize();
    return connection.createEntityManager();
});
