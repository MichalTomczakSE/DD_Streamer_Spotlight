import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { StreamersService } from "../streamers/streamers.service";
import {Server} from "socket.io";




@WebSocketGateway({
    cors:
        {
            origin: "*"
        }
})
export class VotesGateway {
    constructor(private readonly streamersService: StreamersService) {
    }

    @WebSocketServer()
    server: Server;


    @SubscribeMessage("newVote")
    async onNewVote(@MessageBody() id: string) {
        this.server.emit("onVote", await this.streamersService.findOne(id));
    }

}