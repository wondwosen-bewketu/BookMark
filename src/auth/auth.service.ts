import { Injectable } from '@nestjs/common';
import {User,Bookmark} from @PrismaClient

@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'I Am Sign In' };
  }


  signup() {
    return { msg: 'I Am Sign Up' };
  }
}import { Prisma, PrismaClient } from '@prisma/client';

