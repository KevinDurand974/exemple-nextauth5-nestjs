import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User, UserDecorator } from "src/user/user.decorator";
import { UserService } from "src/user/user.service";
import { RefreshAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private userService: UserService,
	) {}

	@Post("register")
	async register(@Body() data: { email: string; name: string }) {
		return this.userService.create(data);
	}

	@Post("login")
	async login(@Body() data: { email: string }) {
		return this.authService.login(data);
	}

	@Post("refresh")
	@UseGuards(RefreshAuthGuard)
	async refresh(@User() user: UserDecorator) {
		return this.authService.refreshToken(user);
	}
}
