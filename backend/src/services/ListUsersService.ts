import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

export class ListUsersService {
  async execute() {
    const repo = AppDataSource.getRepository(User);

    const users = await repo.find({
      order: { id: "DESC" as any },
    });

    // remove senha da resposta
    return users.map(({ senha, ...rest }: any) => rest);
  }
}
