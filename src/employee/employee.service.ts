import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {

  constructor(private prisma: PrismaService) {}

  async create(employeeDto: EmployeeDto) {
    
    try {
      const employee = await this.prisma.employee.create({
        data: {
          email: employeeDto.email,
          firstName: employeeDto.firstName,
          lastName: employeeDto.lastName,
          companyId: employeeDto.companyId,
          departmentId: employeeDto.departmentId
        }
      });
      
      return employee;

    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(err); 
        if (err.code === 'P2002') {
          throw new ForbiddenException("Email is already taken.");
        }
      }

      throw err;
    }
  
  }

  async findAll() {
    
    const employees = await this.prisma.employee.findMany({
      include: {
        company: true,
        department: true
      }
    });
    return employees;

  }

  async findOne(id: number) {
    
    const employee = await this.prisma.employee.findFirst({
      where: {
        id: id
      },
      include: {
        company: true,
        department: true
      }
    });

    return employee;
  }

  async update(id: number, employeeDto: EmployeeDto) {
    
    try {
      const employee = await this.prisma.employee.update({
        data: {
          email: employeeDto.email,
          firstName: employeeDto.firstName,
          lastName: employeeDto.lastName,
          companyId: employeeDto.companyId,
          departmentId: employeeDto.departmentId
        },
        where: {
          id: id
        }
      });
      
      return employee;

    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(err); 
        if (err.code === 'P2025') {
          throw new ForbiddenException("Record Not Found.");
        }
      }

      throw err;
    }
  }

  async remove(id: number) {
    
    try {
      const employee = await this.prisma.employee.delete({
        where: {
          id: id
        }
      });
  
      return employee;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(err); 
        if (err.code === 'P2025') {
          throw new ForbiddenException("Record Not Found.");
        }
      }

      throw err;
    }
  }
}
