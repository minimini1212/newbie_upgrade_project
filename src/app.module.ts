import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        UserModule, 
        AuthModule, 
        // db와의 통신을 위한 코드 
        TypeOrmModule.forRootAsync(typeOrmModuleOptions),
        // env파일에서 환경변수를 전역으로 쓸 수 있게 해주는 코드
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // 전체적으로 jwtservice를 사용하기 위한 모듈등록
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
        }),
        PostModule,
    ], // imports: [UserModule]의 의미는 UserModule에서 제공하는 것들을 현재 모듈에서도 사용하겠다
    controllers: [AppController, UserController],
    providers: [AppService],
})
export class AppModule {}
