import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { IdValidationPipe } from "../../common/pipe/id-validation.pipe";

import { CourseService } from "./course.service";

import { CreateCourseRequestDto } from "./dto/request/create-course.request-dto";
import { UpdateCourseRequestDto } from "./dto/request/update-course.request-dto";
import { CourseResponseDto } from "./dto/response/course.response-dto";

@ApiTags('course')
@Controller('course')
export class CourseController {

    constructor(private readonly courseService: CourseService) { }

    @Get()
    @ApiOkResponse({ type: [CourseResponseDto] })
    async getAll() {
        const courses = await this.courseService.getAllWithMedia();
        return courses.map(course => new CourseResponseDto(course));
    }

    @Get(':id')
    @ApiOkResponse({ type: CourseResponseDto })
    async getById(@Param('id', IdValidationPipe) id: number) {
        const course = await this.courseService.getByIdWithMediaAndLessonsOrFail(id);
        return new CourseResponseDto(course);
    }

    @Post()
    @ApiOkResponse({ type: CourseResponseDto })
    async create(@Body() createDto: CreateCourseRequestDto) {
        const course = await this.courseService.create(createDto);
        return new CourseResponseDto(course);
    }

    @Patch(':id')
    @ApiOkResponse({ type: CourseResponseDto })
    async update(
        @Body() updateDto: UpdateCourseRequestDto,
        @Param('id', IdValidationPipe) id: number
    ) {
        const course = await this.courseService.update(updateDto, id);
        return new CourseResponseDto(course);
    }

    @Delete(':id')
    async deleteById(@Param('id', IdValidationPipe) id: number) {
        await this.courseService.deleteById(id);
    }
}