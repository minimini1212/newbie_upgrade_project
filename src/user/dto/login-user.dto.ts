import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class logInUserDto extends PickType(User, ['email', 'password']) {

    @IsString()
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    password: string;
}