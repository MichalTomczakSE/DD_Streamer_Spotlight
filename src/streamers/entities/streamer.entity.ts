import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Platform} from "../../types";

@Entity()
export class Streamer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true,
        length: 100,
        nullable: false
    })
    username: string;


    @Column({
        length: 7,
        nullable: false
    })
    platform: Platform;


    @Column({
        length: 2000,
        nullable: true
    })
    description: string | null;

    @Column({
        default: 0,
        type: "integer"
    })
    upVotes: number;


    @Column({
        default: 0,
        type: "integer"
    })
    downVotes: number;

    @Column({
        default: null,
        nullable: true
    })
    imageFn: string;
}
