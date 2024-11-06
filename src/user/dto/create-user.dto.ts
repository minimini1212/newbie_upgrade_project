import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto extends PickType(User, ['email', 'password', 'nickname']) {

    @IsString()
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    // @Matches(/^(?!\s*$).+/, { message: '이메일을 입력해주세요.' }) // 빈 문자열 검증 추가
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    @MinLength(6, { message: '비밀번호는 최소 6자리 입니다.' })
    // @Matches(/^(?!\s*$).+/, { message: '비밀번호는 빈 문자열일 수 없습니다.' }) // 빈 문자열 검증 추가
    password: string;

    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    @IsString()
    // @Matches(/^(?!\s*$).+/, { message: '비밀번호는 빈 문자열일 수 없습니다.' }) // 빈 문자열 검증 추가
    passwordConfirm: string;

    @IsString()
    @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
    // @Matches(/^(?!\s*$).+/, { message: '닉네임을 입력해주세요.' }) // 빈 문자열 검증 추가
    nickname: string;
}