import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
    EMPTY_USER,
    EXPIRE_TOKEN,
    INVALID_TOKEN,
    NOT_EQUALS_PASSWORD,
} from './const/auth.excption-message';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { logInUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    // 로그인
    async signIn(loginUserDto: logInUserDto) {
        const existingUser = await this.authenticate(loginUserDto);

        return this.loginUser(existingUser);
    }

    // 토큰 리턴
    loginUser(user: Pick<User, 'email' | 'id'>) {
        return {
            accessToken: this.signToken(user, false),
            refreshToken: this.signToken(user, true),
        };
    }

    // 유저검증 -> basicGuard 사용안함
    async authenticate(loginUserDto: logInUserDto) {
        console.log(loginUserDto, '---------------------');
        const existingUser = await this.userService.findByEmail(loginUserDto.email);

        if (!existingUser) {
            throw new UnauthorizedException(EMPTY_USER);
        }
        console.log(existingUser);
        const comparingPassword = await bcrypt.compare(
            loginUserDto.password,
            existingUser.password,
        );
        if (!comparingPassword) {
            throw new UnauthorizedException(NOT_EQUALS_PASSWORD);
        }
        return existingUser;
    }

    // 토큰발급
    signToken(user: Pick<User, 'email' | 'id'>, isRefreshToken: boolean) {
        const token = this.jwtService.sign(
            {
                sub: user.id,
                email: user.email,
                id: user.id,
                type: isRefreshToken ? 'refresh' : 'access',
            },
            { expiresIn: isRefreshToken ? '1h' : '1h' },
        );

        return token;
    }

    // 토큰추출
    async extractToken(header: string, isBearer: boolean) {
        const splitToken = header.split(' ');
        const prefix = isBearer ? 'Basic' : 'Bearer';

        if (splitToken.length !== 2 || splitToken[0] !== prefix) {
            throw new UnauthorizedException(INVALID_TOKEN);
        }

        const token = splitToken[1];
        return token;
    }

    // 토큰검증
    async verifyToken(rowToken: string) {
        try {
            const result = this.jwtService.verify(rowToken);
            return result;
        } catch (error) {
            throw new UnauthorizedException(EXPIRE_TOKEN);
        }
    }

    /**
     * Basic token = sldkfhjqlkwehrklh
     *
     * 1) sldkfhjqlkwehrklh -> email:password로 변형
     * 2)  email:password  -> [email, password]로 변형
     * 3) {email: email, password : password}로 변형
     *
     * 인코딩된 header의 authorization 토큰을 decoding 하기위함
     */

    decodeBasicToken(base64String: string) {
        const decoded = Buffer.from(base64String, 'base64').toString('utf-8');

        const split = decoded.split(':');
        if (split.length !== 2) {
            throw new UnauthorizedException('잘못된 유형 토큰');
        }

        const email = split[0];
        const password = split[1];

        return {
            email,
            password,
        };
    }

    // 토큰재발급
    rotateToken(rowToken: string, isRefresh: boolean) {
        const result = this.jwtService.verify(rowToken);

        return this.signToken(
            {
                ...result,
            },
            isRefresh,
        );
    }

    // /**
    //  * 구글 로그인
    //  * @param req
    //  * @returns
    //  */

    // googleLogin(req) {
    //     if (!req.user) {
    //         return ' No user from google';
    //     }

    //     return {
    //         message: ' User information from google',
    //         user: req.user,
    //     };
    // }

    // /**
    //  * 유저 인증(이메일 인증버튼 클릭 이후)
    //  * @param token
    //  * @returns
    //  */

    // async verificationUser(token: string) {
    //     const result = await this.verifyToken(token);

    //     const user = await this.userService.getUserById(result.id);

    //     if (!user) {
    //         throw new NotAcceptableException();
    //     }

    //     await this.userService.updateUser(user.id, { isVerified: true });

    //     return user;
    // }
}
