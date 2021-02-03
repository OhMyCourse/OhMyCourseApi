import { NotFoundException } from "@nestjs/common";

export class LessonNotFoundException extends NotFoundException {

    constructor() {
        super('Lesson is not found!');
    }
}