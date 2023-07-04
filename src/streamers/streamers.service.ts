import {BadRequestException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateStreamerDto} from './dto/create-streamer.dto';
import {UpdateStreamerDto} from './dto/update-streamer.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Streamer} from "./entities/streamer.entity";
import {Repository} from "typeorm";
import {
    GetOneStreamerFullData,
    GetStreamersData,
    MulterDiskUploadedFiles,
    OneStreamerData,
    UpdatedStreamerData
} from "../types";
import fs from "fs/promises";
import * as path from "path";
import {storageDir} from "../utils/storage";

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

    async create(req: CreateStreamerDto, file: MulterDiskUploadedFiles): Promise<GetStreamersData | BadRequestException> {
        const existingStreamer = await this.streamersRepository.findOneBy({username: req.username})
        const uploadedImage = file?.image?.[0] ?? null;
        const deleteUploadedImage = async (filename: string) => {
            try {
                await fs.unlink(path.join(storageDir(), "streamer-images", filename));
            } catch (imageDeleteError) {
                console.error(imageDeleteError);
            }
        };

        if (existingStreamer) {
            uploadedImage ? await deleteUploadedImage(uploadedImage.filename) : null;
            throw new BadRequestException({
                statusCode: 400,
                message: `${existingStreamer.username} is already created on site`,
                existingStreamer: existingStreamer.id
            });
        }
        try {
            const streamer = this.streamersRepository.create(req);
            if (uploadedImage) {
                streamer.imageFn = uploadedImage.filename;
            }
            await this.streamersRepository.save(streamer);
            const {imageFn, description, ...streamerData} = streamer;
            return streamerData;
        } catch (error) {
            await deleteUploadedImage(uploadedImage.filename);
            throw error;
        }
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

    async getImage(id: string, res: any) {
        try {
            const streamerData = await this.streamersRepository.findOneBy({id});
            if (!streamerData) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: "There was no streamer with the given id!",
                    status: 404,
                });
            }
            if (streamerData.imageFn == null) {
                try {
                    res.sendFile('default_photo.png', {
                        root: path.join(storageDir(), "streamer-images"),
                    });
                    return;
                } catch (err) {
                    res.status(HttpStatus.NOT_IMPLEMENTED).json({
                        error: err.message
                    })
                }
            }

            res.sendFile(streamerData.imageFn, {
                root: path.join(storageDir(), "streamer-images"),
            });
        } catch (err) {
            res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                error: {
                    error: err.message,
                    message: 'Please try again later!'
                }
            });
        }
    }
}


