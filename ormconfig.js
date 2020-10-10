const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

require('dotenv').config({ path: './dev.env' });

module.exports = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
    namingStrategy: new SnakeNamingStrategy(),
    logging: process.env.TYPEORM_LOGGING
};