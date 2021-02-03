import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateUserRequestDto } from "./dto/create-user.request-dto";

import { UserRepository } from "./user.repository";

import * as bcrypt from "bcrypt";
import { MediaService } from "../media/media.service";
import { JwtAuthService } from "../../shared/services/jwt/jwt-auth.service";
import { UserLoginRequestDto } from "./dto/user-login.request-dto";
import { User } from "./user.entity";
import { UpdateUserRequestDto } from "./dto/update-user.request-dto";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly mediaService: MediaService,
        private readonly jwtAuthService: JwtAuthService
    ) { }

    public async getByIdOrFail(id: number) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        return user;
    }

    public async createUser(createDto: CreateUserRequestDto): Promise<string> {
        const oldUser = await this.userRepository.findOne({ email: createDto.email });
        if (oldUser) {
            throw new ConflictException('User already exists!');
        }

        await this.mediaService.getByIdOrFail(createDto.mediaId);

        const hashPassword: string = await bcrypt.hash(createDto.password, 11);
        const user = this.userRepository.create({ ...createDto, password: hashPassword });

        const savedUser = await this.userRepository.save(user);

        return this.jwtAuthService.generateJwt({ id: savedUser.id });
    }

    public async login(loginDto: UserLoginRequestDto): Promise<string> {
        const user = await this.userRepository.findOne({ email: loginDto.email });
        if (!user) {
            throw new ForbiddenException('Invalid email!');
        }

        const match = await bcrypt.compare(loginDto.password, user.password);
        if (!match) {
            throw new ForbiddenException('Invalid password!');
        }

        return this.jwtAuthService.generateJwt({ id: user.id });
    }

    public async updateProfile(updateDto: UpdateUserRequestDto, userId: number): Promise<User> {
        const user = await this.getByIdOrFail(userId);
        const newUser = this.userRepository.merge(user, updateDto);

        return this.userRepository.save(newUser);
    }
}