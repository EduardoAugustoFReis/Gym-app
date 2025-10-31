import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly salRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.salRounds);
  }

  async comparePassword(
    password: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return await compare(password, passwordHashed);
  }
}
