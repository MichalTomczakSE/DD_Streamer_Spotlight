import {IsNumber, IsOptional} from "class-validator";

export class UpdateStreamerDto {

    @IsOptional()
    @IsNumber()
    upVotes: number = 0;

    @IsOptional()
    @IsNumber()
    downVotes: number = 0;

}
