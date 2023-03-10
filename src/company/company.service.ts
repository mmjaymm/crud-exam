import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(companyDto: CompanyDto) {
    
    try {
      const company = await this.prisma.company.create({
        data: {
          name: companyDto.name
        }
      });
  
      return company;

    } catch (err) {
      throw new HttpException("Unable to save.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async findAll() {
    const companies = await this.prisma.company.findMany({
      include: {
        users: true,
        departments: true,
        employees: true,
      }
    });
    return companies;
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findFirst({
      where: {
        id: id
      }
    });

    if (company === null) {
      throw new HttpException("Company Not Found.", HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async update(id: number, companyDto: CompanyDto) {

    try {
      const company = await this.prisma.company.update({
        data: {
          name: companyDto.name
        },
        where: {
          id: id
        }
      });
  
      return company;

    } catch (err) {

      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new ForbiddenException("Record Not Found.");
        }
      }

      throw err;
    }
  }

  async remove(id: number) {

    try {
      const company = await this.prisma.company.delete({
        where: {
          id: id
        }
      });
  
      return company;
      
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        console.log(err); 
        if (err.code === 'P2025') {
          throw new NotFoundException("Record Not Found.");
        }
      }

      throw err;
    }
    
  }
}
