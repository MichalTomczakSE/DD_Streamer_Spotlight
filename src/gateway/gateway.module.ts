import { Module } from "@nestjs/common";
import { VotesGateway } from "./votes.gateway";
import { Streamer } from "../streamers/entities/streamer.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StreamersService } from "../streamers/streamers.service";


@Module({
    imports: [TypeOrmModule.forFeature([Streamer])],
    providers: [VotesGateway, StreamersService]
})
export class GatewayModule {

}