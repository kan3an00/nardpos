import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { registerDto } from './register.dto';
import { sanitizeUser } from 'src/utils/utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { email: user.email, sub: user.id, role: user.role};

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            user: sanitizeUser(user),
            accessToken: accessToken
        };
    }

    async register(register: registerDto): Promise<any> {
        const hashedPassword = await bcrypt.hash(register.password, 10);
        register.password = hashedPassword;
        const user = await this.usersService.create(register);
        const payload = { email: user.email, sub: user.id, role: user.role };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            user: sanitizeUser(user),
            accessToken: accessToken
        };
    }
}
