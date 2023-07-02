import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateStreamerDto} from './dto/create-streamer.dto';
import {UpdateStreamerDto} from './dto/update-streamer.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Streamer} from "./entities/streamer.entity";
import {Repository} from "typeorm";
import {GetOneStreamerFullData, GetStreamersData, OneStreamerData, UpdatedStreamerData} from "../types";

@Injectable()
export class StreamersService {
    constructor(
        @InjectRepository(Streamer) private streamersRepository: Repository<Streamer>
    ) {
    }

    filter(streamer: Streamer): GetStreamersData {
        const {id, username, upVotes, downVotes, platform} = streamer;
        return {id, username, upVotes, downVotes, platform};
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

    async findAll(): Promise<GetStreamersData[] | NotFoundException> {
        const streamers = await this.streamersRepository.find();
        if (streamers.length == 0) {
            throw new NotFoundException(`Streamers not found, please add some streamers to the repository`);
        }
        return (await this.streamersRepository.find()).map(this.filter);
    }

    async findOne(id: string): Promise<OneStreamerData> {
        const streamer = await this.streamersRepository.findOneBy({id});
        if (!streamer) {
            throw new NotFoundException(`Sorry, Streamer with ID ${id} is not found in the repository`);
        }
        return streamer;
    }

    async update(id: string, req: UpdateStreamerDto): Promise<UpdatedStreamerData | NotFoundException> {
        const streamer = await this.findOne(id) as GetOneStreamerFullData;
        if (!streamer) {
            throw new NotFoundException("Streamer with this ID does not exist, or has been deleted. Please try again.");
        }
        const {upVotes, downVotes} = req;
        if (upVotes) {
            streamer.upVotes += upVotes;
        } else if (downVotes) {
            streamer.downVotes += downVotes;
        }
        await this.streamersRepository.save(streamer);
        const {username, platform, description, imageFn, ...updatedStreamerData} = streamer;
        return updatedStreamerData;
    }


    getImage(id: string, res: any) {

    }
}