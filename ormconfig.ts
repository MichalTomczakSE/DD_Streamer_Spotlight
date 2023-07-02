import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const ormConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'streamer-spotlight',
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
}