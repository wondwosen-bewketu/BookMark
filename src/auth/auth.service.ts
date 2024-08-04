import {
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { create } from 'domain';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate the hash password
    const hash = await argon.hash(dto.password);

    try {
      //save the new user on the DB
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });

      delete user.hash;
      //return the saved user
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
    }
  }

  signin() {
    return { msg: 'I Am Sign Up' };
  }
}
