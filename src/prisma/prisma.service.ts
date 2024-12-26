import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Automatically connect to the database when the module is initialized
  async onModuleInit() {
    await this.$connect();
  }

  // Automatically disconnect from the database when the module is destroyed
  async onModuleDestroy() {
    await this.$disconnect();
  }


}