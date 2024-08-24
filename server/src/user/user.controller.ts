import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(":uniqueId")
	@UseGuards(AuthGuard)
	async getUserProfile(@Param("uniqueId") uniqueId: string) {
		return this.userService.findByUniqueId(uniqueId);
	}
}
