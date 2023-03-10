import { Controller } from "@nestjs/common";
import { Post } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login() {
        return this.authService.login()
    }

    @Post('signup')
    signup() {
        return this.authService.signup()
    }
}