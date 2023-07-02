import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Platform} from "../../types";

@Entity()
export class Streamer {
    @ApiProperty({
        description: "Content creator unique identifier",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: "Content creator name",
        example: "Asmongold"
    })
    @Column({
        unique: true,
        length: 100,
        nullable: false
    })
    username: string;

    @ApiProperty({
        description: "Platform where content creator streams are created",
        example: "Twitch"
    })
    @Column({
        length: 7,
        nullable: false
    })
    platform: Platform;

    @ApiProperty({
        description: "Short description about content creator",
        example: "Asmongold is an American Twitch streamer, YouTuber, content creator, who is recognized for his WoW gameplay."
    })
    @Column({
        length: 2000,
        nullable: true
    })
    description: string | null;

    @ApiProperty({
        description: "Number of up votes for content creator",
        example: "10"
    })
    @Column({
        default: 0,
        type: "integer"
    })
    upVotes: number;

    @ApiProperty({
        description: "Number of down votes for content creator",
        example: "-10"
    })
    @Column({
        default: 0,
        type: "integer"
    })
    downVotes: number;

    @ApiProperty({
        description: "Name of image stored on server as uuid",
        example: "550e8400-e29b-41d4-a716-446655440000.jpeg"
    })
    @Column({
        default: null,
        nullable: true
    })
    imageFn: string;
}
