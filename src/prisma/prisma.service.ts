import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { url } from 'inspector';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:mysecretpassword@localhost:5432/postgres',
        },
      },
    });
  }
}
