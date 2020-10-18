import { Injectable } from "@nestjs/common";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { File } from "../../common/type/file.type";
import { MediaNotFoundException } from "../../exceptions/not-found/media-not-found.exception";
import { FileStorageService } from "../../shared/services/file-storage.service";

import { Media } from "./media.entity";

import { MediaRepository } from "./media.repository";

@Injectable()
export class MediaService {

    constructor(
        private readonly fileStorageService: FileStorageService,
        private readonly mediaRepository: MediaRepository
    ) { }

    public async getByIdOrFail(id: number): Promise<Media> {
        const media = await this.mediaRepository.findOne(id);
        if (!media) {
            throw new MediaNotFoundException();
        }
        return media;
    }

    public async getUnboundByIdOrFail(id: number): Promise<Media> {
        const media = await this.mediaRepository.findUnboundById(id);
        if (!media) {
            throw new MediaNotFoundException();
        }
        return media;
    }


    public async loadMedia(id: number): Promise<[Media, Buffer]> {
        const media = await this.getByIdOrFail(id);
        const buffer = await this.fileStorageService.readFile(media.fileName);

        return [media, buffer];
    }

    public async create(file: File): Promise<Media> {
        const fileName = await this.fileStorageService.saveFile(file);
        const media = this.mediaRepository.create({
            fileName: fileName,
            mimetype: file.mimetype
        });

        return this.mediaRepository.save(media);
    }

    @Transactional()
    public async deleteById(id: number): Promise<void> {
        const media = await this.getByIdOrFail(id);

        await this.fileStorageService.deleteFile(media.fileName);
        await this.mediaRepository.delete(id);
    }
}