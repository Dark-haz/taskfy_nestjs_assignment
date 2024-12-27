import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { CreateAvailabilityDto } from './dto/createAvailabilityDto';
import { AvailabilityEntity } from './entities/availabilityEntity';
import { plainToClass } from 'class-transformer'
import { PrismaService } from 'src/prisma/prisma.service';


// Actual logic
@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) { }

  async createAvailability(employeeId , createAvailabilityDto: CreateAvailabilityDto): Promise<AvailabilityEntity> {

    if (createAvailabilityDto.start_time > createAvailabilityDto.end_time) {
      throw new BadRequestException('Start time cannot be later than end time.');
    }

    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: employeeId
      },
    });
    if (!employee) { throw new NotFoundException("Employee doesn't exist") }

    const givenDate = createAvailabilityDto.date; 
    givenDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (givenDate < today) {
      throw new BadRequestException('Date cannot be in the past.');
    } 

    const availabilityEntity = plainToClass(AvailabilityEntity, {
      ...createAvailabilityDto,
      employee_id:employeeId
      
    }, { excludeExtraneousValues: true })

    const createdAvailability = await this.prismaService.availability.create({
      data: availabilityEntity,
    });

    // directly return entity instead of creating a dto as it's not crucial (no passwords,,.)
    return availabilityEntity;
  }

  async deleteAvailability() { }

  async createWorklog() {

  }

  async getAvailability(employeeId:number){
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: employeeId
      },
    });
    if (!employee) { throw new NotFoundException("Employee doesn't exist") }

    const availability = this.prismaService.availability.findMany({
      where:{
        employee_id : employeeId
      }
    })

    return availability;
  }
}
