import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class ConfigService {
    constructor() {
        dotenv.config({ path: 'dev.env' });
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return +this.get(key);
    }

    public getBoolean(key: string): boolean {
        return Boolean(this.get(key));
    }

    public get typeOrmConfig(): ConnectionOptions {
        return {
            type: 'postgres',
            host: this.get('TYPEORM_HOST'),
            port: this.getNumber('TYPEORM_PORT'),
            username: this.get('TYPEORM_USERNAME'),
            password: this.get('TYPEORM_PASSWORD'),
            database: this.get('TYPEORM_DATABASE'),
            entities: [this.get('TYPEORM_ENTITIES')],
            migrations: [this.get('TYPEORM_MIGRATIONS')],
            cli: {
                migrationsDir: this.get('TYPEORM_MIGRATIONS_DIR'),
            },
            namingStrategy: new SnakeNamingStrategy(),
            logging: this.getBoolean('APP_PORT')
        };
    }
}
