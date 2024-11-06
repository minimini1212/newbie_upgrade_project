import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { BasicTokenGuard } from './guard/basic.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, BasicTokenGuard],
  exports: [AuthService, BasicTokenGuard]
})
export class AuthModule {}
