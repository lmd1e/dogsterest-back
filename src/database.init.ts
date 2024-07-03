import { createConnection } from 'typeorm';
import { DogEntity } from './entities/dog.entity';

export async function initDB() {
try {
    const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'postgres',
        entities: [DogEntity],
        synchronize: true, 
    });
    } catch (error) {
    console.error('Error connecting to the database', error);
    }
}