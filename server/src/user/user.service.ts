import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(data: { email: string; name: string }) {
		const count = await this.prisma.user.count({
			where: { email: data.email },
		});
		if (count > 0) throw new ConflictException("Email already exists");

		return this.prisma.user.create({ data });
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async findByUniqueId(uniqueId: string) {
		return this.prisma.user.findUnique({ where: { uuid: uniqueId } });
	}
}
