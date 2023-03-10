import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(departmentDto: DepartmentDto) {
    
    const department = await this.prisma.department.create({
      data: {
        name: departmentDto.name,
        companyId: departmentDto.companyId
      }
    });

    return department;

  }

  async findAll() {
    const departments = await this.prisma.department.findMany({
      include: {
        company: true
      }
    });
    return departments;
  }

  async findOne(id: number) {
    const department = await this.prisma.department.findFirst({
      where: {
        id: id
      }
    });

    return department;
  }

  async update(id: number, departmentDto: DepartmentDto) {
    const department = await this.prisma.department.update({
      data: {
        name: departmentDto.name,
        companyId: departmentDto.companyId
      },
      where: {
        id: id
      }
    });

    return department;
  }

  async remove(id: number) {
    const department = await this.prisma.department.delete({
      where: {
        id: id
      }
    });

    return department;
  }
}
