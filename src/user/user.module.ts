import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashService } from 'src/common/hash/hash.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
