import { NotFoundException } from "@nestjs/common";

export class MediaNotFoundException extends NotFoundException {

    constructor() {
        super('Media is not found!');
    }
}