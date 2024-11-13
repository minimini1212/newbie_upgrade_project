import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { BasicTokenGuard } from './guard/basic.guard';
import { BearerTokenGuard } from './guard/bearer.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, BasicTokenGuard, BearerTokenGuard],
  exports: [AuthService, BasicTokenGuard, BearerTokenGuard]
})
export class AuthModule {}
