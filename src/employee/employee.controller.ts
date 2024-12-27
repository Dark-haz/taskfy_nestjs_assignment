import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateAvailabilityDto } from './dto/createAvailabilityDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/guards/auth.guard';


// routes
@Controller('employee')
export class EmployeeController {
    constructor( 
        private readonly prismaService:PrismaService,
        private readonly employeeService:EmployeeService
    ){}


    @Get("/")
    test(@Req() req){
        return "req.user.username";
    }

    @UseGuards(AuthGuard)
    @Post("/create/availability")
    createAvailability(@Req() req , @Body() availabilityDto:CreateAvailabilityDto){
        return this.employeeService.createAvailability(req.user.sub ,availabilityDto);
    }

    @UseGuards(AuthGuard)
    @Get("/get/availability")
    getAvailability(@Req() req ){
        return this.employeeService.getAvailability(req.user.sub);
    }

}
