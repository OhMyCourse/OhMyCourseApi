import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../guards/jwt.guard";
import { CreateUserRequestDto } from "./dto/create-user.request-dto";
import { UpdateUserRequestDto } from "./dto/update-user.request-dto";
import { UserLoginRequestDto } from "./dto/user-login.request-dto";

import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async getProfileInfo(@Req() req) {
        return this.userService.getByIdOrFail(req.user.id);
    }

    @Put('')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async updateProfile(
        @Req() req,
        @Body() updateDto: UpdateUserRequestDto
    ) {
        return this.userService.updateProfile(updateDto, req.user.id);
    }

    @Post('')
    async createUser(@Body() createDto: CreateUserRequestDto) {
        const token = await this.userService.createUser(createDto);
        return { token: token };
    }

    @Post('login')
    async login(@Body() loginDto: UserLoginRequestDto) {
        const token = await this.userService.login(loginDto);
        return { token: token };
    }

}