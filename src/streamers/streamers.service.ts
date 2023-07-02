import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateStreamerDto} from './dto/create-streamer.dto';
import {UpdateStreamerDto} from './dto/update-streamer.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Streamer} from "./entities/streamer.entity";
import {Repository} from "typeorm";
import {GetStreamerData, GetStreamersData} from "../types";

@Injectable()
export class StreamersService {
    constructor(
        @InjectRepository(Streamer) private streamersRepository: Repository<Streamer>
    ) {
    }

    async create(req: CreateStreamerDto): Promise<GetStreamersData | BadRequestException> {
        const existingStreamer = await this.streamersRepository.findOneBy({username: req.username})
        if (existingStreamer) {
            throw new BadRequestException({
                message: `${existingStreamer.username} is already created on site`,
                existingStreamer: existingStreamer.id
            });
        }
        const streamer = this.streamersRepository.create(req);
        await this.streamersRepository.save(streamer);
        const {imageFn, description, ...streamerData} = streamer;
        return streamerData;
    }

    findAll() {
        return `This action returns all streamers`;
    }

    findOne(id: number) {
        return `This action returns a #${id} streamer`;
    }

    update(id: number, updateStreamerDto: UpdateStreamerDto) {
        return `This action updates a #${id} streamer`;
    }

    remove(id: number) {
        return `This action removes a #${id} streamer`;
    }

    getImage(id: string, res: any) {

    }
}
