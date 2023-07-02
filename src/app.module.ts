import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ormConfig} from "../ormconfig";
import {StreamersModule} from "./streamers/streamers.module";
import { GatewayModule } from './gateway/gateway.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        StreamersModule,
        GatewayModule],
    controllers: [],
    providers: [AppService],
})
export class AppModule {
}
