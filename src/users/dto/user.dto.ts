import { IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    companyId: number = 0;

    @IsNotEmpty()
    departmentId: number = 0;
}
