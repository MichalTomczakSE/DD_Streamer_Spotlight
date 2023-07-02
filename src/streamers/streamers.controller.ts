import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Res,
    ParseUUIDPipe,
    BadRequestException,
    NotFoundException, UseInterceptors, UploadedFiles
} from '@nestjs/common';
import {StreamersService} from './streamers.service';
import {CreateStreamerDto} from './dto/create-streamer.dto';
import {UpdateStreamerDto} from './dto/update-streamer.dto';
import {GetStreamersData, MulterDiskUploadedFiles, OneStreamerData, UpdatedStreamerData} from "../types";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {multerStorage, storageDir} from "../../utils/storage";
import * as path from "path";

@Controller('streamers')
export class StreamersController {
    constructor(private readonly streamersService: StreamersService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
                {
                    name: "image",
                    maxCount: 1
                }
            ], {storage: multerStorage(path.join(storageDir(), "streamer-images"))}
        )
    )
    create(@Body() req: CreateStreamerDto,
           @UploadedFiles() file: MulterDiskUploadedFiles): Promise<GetStreamersData | BadRequestException> {
        return this.streamersService.create(req, file);
    }

    @Get('/')
    findAll(): Promise<GetStreamersData[] | NotFoundException> {
        return this.streamersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<OneStreamerData | NotFoundException> {
        return this.streamersService.findOne(id);
    }

    @Put(':id/vote')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() req: UpdateStreamerDto): Promise<UpdatedStreamerData | BadRequestException> {
        return this.streamersService.update(id, req);
    }

    @Get("/image/:id")
    async getImage(@Param('id', ParseUUIDPipe) id: string,
                   @Res() res: any): Promise<any> {
        return this.streamersService.getImage(id, res)
    }
}
