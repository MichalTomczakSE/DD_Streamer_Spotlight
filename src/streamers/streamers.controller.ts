import {Controller, Get, Post, Body, Param, Put, Res} from '@nestjs/common';
import {StreamersService} from './streamers.service';
import {CreateStreamerDto} from './dto/create-streamer.dto';
import {UpdateStreamerDto} from './dto/update-streamer.dto';

@Controller('streamers')
export class StreamersController {
    constructor(private readonly streamersService: StreamersService) {
    }

    @Post()
    create(@Body() createStreamerDto: CreateStreamerDto) {
        return this.streamersService.create(createStreamerDto);
    }

    @Get()
    findAll() {
        return this.streamersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.streamersService.findOne(+id);
    }

    @Put(':id/vote')
    update(@Param('id') id: string, @Body() updateStreamerDto: UpdateStreamerDto) {
        return this.streamersService.update(+id, updateStreamerDto);
    }

    @Get("/image/:id")
    async getImage(@Param('id') id: string,
                   @Res() res: any): Promise<any> {
        return this.streamersService.getImage(id, res)
    }
}
