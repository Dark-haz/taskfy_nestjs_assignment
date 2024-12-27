
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) { }

    async employeeSignIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.prismaService.employee.findUnique({
            where: {
                email: email,
                NOT: {
                    role: "Manager"
                }
            }
        })

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        const payload = { sub: user.id, username: user.name , email : user.email , role : user.role};

        return {
          access_token: await this.jwtService.signAsync(payload),
        };
   
    }
}
