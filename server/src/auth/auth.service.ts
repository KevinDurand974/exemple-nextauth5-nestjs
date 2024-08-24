import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

const EXPIRE_TIME = 1000 * 20;

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private config: ConfigService,
	) {}

	async login(data: { email: string }) {
		const user = await this.validateUser(data);
		const payload = { id: user.uuid, sub: { email: user.email, id: user.id } };

		return {
			user,
			backendTokens: {
				accessToken: await this.jwtService.signAsync(payload, {
					expiresIn: "20s",
					secret: this.config.get("JWT_SECRET"),
				}),
				refreshToken: await this.jwtService.signAsync(payload, {
					expiresIn: "7d",
					secret: this.config.get("JWT_REFRESH_SECRET"),
				}),
				expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
			},
		};
	}

	async validateUser(data: { email: string }) {
		const user = await this.userService.findByEmail(data.email);
		if (!user) throw new UnauthorizedException("Invalid user");
		return user;
	}

	async refreshToken(user: { id: string; sub: object }) {
		const payload = {
			id: user.id,
			sub: user.sub,
		};

		return {
			accessToken: await this.jwtService.signAsync(payload, {
				expiresIn: "20s",
				secret: this.config.get("JWT_SECRET"),
			}),
			refreshToken: await this.jwtService.signAsync(payload, {
				expiresIn: "7d",
				secret: this.config.get("JWT_REFRESH_SECRET"),
			}),
			expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
		};
	}
}
