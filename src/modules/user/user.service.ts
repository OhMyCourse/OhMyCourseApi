import { ConflictException, Injectable } from "@nestjs/common";

import { CreateUserRequestDto } from "./dto/create-user.request-dto";

import { UserRepository } from "./user.repository";

import * as bcrypt from "bcrypt";
import { JwtService } from "../../shared/services/jwt.service";
import { MediaService } from "../media/media.service";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly mediaService: MediaService,
        private readonly jwtService: JwtService
    ) { }

    public async createUser(createDto: CreateUserRequestDto): Promise<string> {
        const oldUser = await this.userRepository.findOne({ email: createDto.email });
        if (oldUser) {
            throw new ConflictException('User already exists!');
        }

        await this.mediaService.getByIdOrFail(createDto.mediaId);

        const hashPassword: string = await bcrypt.hash(createDto.password, 11);
        const user = this.userRepository.create({ ...createDto, password: hashPassword });

        const savedUser = await this.userRepository.save(user);

        return this.jwtService.generateJwt({ id: savedUser.id });
    }
}