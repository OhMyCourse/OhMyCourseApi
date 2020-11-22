import { Body, Controller, Post } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./dto/create-user.request-dto";

import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('')
    async createUser(@Body() createDto: CreateUserRequestDto) {
        const token = await this.userService.createUser(createDto);
        return { token: token };
    }
}