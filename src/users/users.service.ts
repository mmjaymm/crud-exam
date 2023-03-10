import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async signup(userDto: UserDto) {
        
        const user = await this.prisma.user.create({
            data: {
                username: userDto.username,
                password: userDto.password,
                companyId: userDto.companyId,
                departmentId: userDto.departmentId
            }
        });
    }
}
