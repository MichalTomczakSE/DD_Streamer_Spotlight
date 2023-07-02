import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateStreamerDto {
    @ApiProperty({
        description: "Update up votes count for content creator",
        example: "1"
    })
    @IsOptional()
    @IsNumber()
    upVotes: number = 0;

    @ApiProperty({
        description: "Update down votes count for content creator",
        example: "-1"
    })
    @IsOptional()
    @IsNumber()
    downVotes: number = 0;

}
