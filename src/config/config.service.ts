import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigService {
  static getTypeOrmConfig(): TypeOrmModuleOptions {
    throw new Error('método não implementado.');
  }
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`erro na configuração - faltando env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      url: this.getValue('DATABASE_URL'),
      synchronize: true,
      logging: true,

      entities: ['src/model/**/*.ts}'],

      autoLoadEntities: true,

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      ssl: false,
    };
  }

  public async getCacheConfig() {
    return {
      store: redisStore,
      host: this.getValue('REDIS_HOST'),
      port: parseInt(this.getValue('REDIS_PORT')),
      password: this.getValue('REDIS_PASSWORD'),
      ttl: parseInt(this.getValue('CACHE_TTL')),
      isGlobal: true,
      max: parseInt(this.getValue('CACHE_MAX')),
    };
  }

  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: this.getValue('JWT_EXPIRES_IN'),
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',
  'REDIS_HOST',
  'REDIS_PORT',
  'CACHE_TTL',
  'CACHE_MAX',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
]);

export { configService };
