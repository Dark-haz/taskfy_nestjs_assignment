import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prisma:PrismaService){}
    async message(){
        return "hello";
    }

}
