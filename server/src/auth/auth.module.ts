import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { EmailExistsConstraint } from 'src/constraints/emailExists';

@Module({
  imports:[
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailExistsConstraint]
})
export class AuthModule {}
