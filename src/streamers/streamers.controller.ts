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
    NotFoundException
} from '@nestjs/common';
import {StreamersService} from './streamers.service';
import {CreateStreamerDto} from './dto/create-streamer.dto';
import {UpdateStreamerDto} from './dto/update-streamer.dto';
import { GetStreamersData, OneStreamerData, UpdatedStreamerData} from "../types";

@Controller('streamers')
export class StreamersController {
    constructor(private readonly streamersService: StreamersService) {
    }

    @Post()
    create(@Body() req: CreateStreamerDto): Promise<GetStreamersData | BadRequestException> {
        return this.streamersService.create(req)
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
