import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "../../../common/decorators/is-id.decorator";

export class SubscribeUserRequestDto {

    @ApiProperty()
    @IsId()
    userId: number;

    @ApiProperty()
    @IsId()
    courseId: number;
}