import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { StreamersService } from "../streamers/streamers.service";
import { UpdateStreamerDto } from "../streamers/dto/update-streamer.dto";
import {Server} from "socket.io";
import {GetStreamersData} from "../types";
import {OnModuleInit} from "@nestjs/common";

interface WebSocketVoteBody {
    id: string;
    vote: UpdateStreamerDto;
}

@WebSocketGateway({
    cors:
        {
            origin: "*"
        }
})
export class VotesGateway implements OnModuleInit{
    constructor(private readonly streamersService: StreamersService) {
    }

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on("connection", socket => console.log(socket.id, "connected"));
    }
    @SubscribeMessage("newVote")
    async onNewVote(@MessageBody() body: WebSocketVoteBody): Promise<GetStreamersData> {
        this.server.emit("onVote", await this.streamersService.update(body.id, body.vote));
        return await this.streamersService.findOne(body.id);
    }
}