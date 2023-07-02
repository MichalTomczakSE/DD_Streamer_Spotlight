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
import {GetStreamerData, GetStreamersData, UpdatedStreamerData} from "../types";

@Controller('streamers')
export class StreamersController {
    constructor(private readonly streamersService: StreamersService) {
    }

    @Post()
    create(@Body() req: CreateStreamerDto): Promise<GetStreamerData | BadRequestException> {
        return;
    }

    @Get()
    findAll(): Promise<GetStreamersData[] | NotFoundException> {
        return;
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GetStreamerData | NotFoundException> {
        return;
    }

    @Put(':id/vote')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() req: UpdateStreamerDto): Promise<UpdatedStreamerData | BadRequestException> {
        return;
    }

    @Get("/image/:id")
    async getImage(@Param('id', ParseUUIDPipe) id: string,
                   @Res() res: any): Promise<any> {
        return this.streamersService.getImage(id, res)
    }
}
