import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

type Platform =
    | "Twitch"
    | "YouTube"
    | "Kick"
    | "Rumble"
    | "TikTok"

export class CreateStreamerDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    username: string;
    @IsNotEmpty()
    @IsString()
    @MaxLength(7)
    platform: Platform;
    @IsOptional()
    @MaxLength(2000)
    description: string;
    @IsOptional()
    imageFn: string;
}
