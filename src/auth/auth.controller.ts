import { Body, Controller, Post } from '@nestjs/common';
import { SessionDto } from './dto/session-create.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  session(@Body() sessionDto: SessionDto) {
    return this.authService.authenticate(sessionDto);
  }
}
