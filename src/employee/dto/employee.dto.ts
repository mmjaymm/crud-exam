import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EmployeeDto {
    @IsOptional()
    @IsString()
    firstName: string = "";
    
    @IsOptional()
    @IsString() 
    lastName: string = "";

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    companyId: number;

    @IsNotEmpty()
    departmentId: number;
}
 