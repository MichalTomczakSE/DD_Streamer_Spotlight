import { Module } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamersController } from './streamers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Streamer} from "./entities/streamer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Streamer])],
  controllers: [StreamersController],
  providers: [StreamersService]
})
export class StreamersModule {}
