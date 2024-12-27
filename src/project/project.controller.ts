import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService:ProjectService){}

    @Get()
    message(){
        return this.projectService.message();
    }
}
