import { ApiProperty } from "@nestjs/swagger";

export class SwaggerFileType {

    @ApiProperty({ type: 'string', format: 'binary' })
    file: File;
}