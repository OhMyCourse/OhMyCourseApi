import { Injectable } from "@nestjs/common";

import { CreateTextContentRequestDto } from "./dto/request/create-text-content.request-dto";

import { TextContent } from "./text-content.entity";

import { TextContentRepository } from "./text-content.repository";

@Injectable()
export class TextContentService {

    constructor(private readonly textContentRepository: TextContentRepository) { }

    public async create(createDto: CreateTextContentRequestDto): Promise<TextContent> {
        const textContent = this.textContentRepository.create(createDto);
        return this.textContentRepository.save(textContent);
    }
}