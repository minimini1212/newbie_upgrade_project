import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DUPLICATE_EMAIL, PASSWORD_NOT_MATCH } from './const/users-error-message';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // 회원가입
    async create(createUserDto: CreateUserDto) {
        const { email, password, nickname, passwordConfirm } = createUserDto;
        const existedUser = await this.findByEmail(email);

        if (existedUser) {
            throw new BadRequestException(DUPLICATE_EMAIL);
        }

        if (password !== passwordConfirm) {
            throw new BadRequestException(PASSWORD_NOT_MATCH);
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUND);

        const newUser = await this.userRepository.save({
            email,
            password: hashedPassword,
            nickname,
        });

        return newUser;
    }

    // email로 유저 찾기 (id와 email 추출 )
    findByEmail(email: string): Promise<{ id: number, email: string, password: string } | null> {
        return this.userRepository.findOne({
            select: ['id', 'email', 'password'], // 문자열 배열로 지정
            where: {
                email,
            },
        });
    }
}
