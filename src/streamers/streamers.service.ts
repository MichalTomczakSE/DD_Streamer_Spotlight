import { Injectable } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';

@Injectable()
export class StreamersService {
  create(createStreamerDto: CreateStreamerDto) {
    return 'This action adds a new streamer';
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
