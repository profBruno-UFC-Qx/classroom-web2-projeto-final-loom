import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";
import { User } from "../entities/User";

interface IRequest {
  userId: number;
  nome_loja: string;
  bio?: string;
  telefone?: string;
  cidade?: string;
  foto_perfil?: string;
}

export class CreateArtesaoService {
  async execute({
    userId,
    nome_loja,
    bio,
    telefone,
    cidade,
    foto_perfil,
  }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.tipo_usuario !== "ARTESAO") {
      throw new Error("Apenas usuários ARTESAO podem criar perfil de artesão");
    }

    const artesaoExiste = await artesaoRepository.findOne({
      where: {
        user: { id: userId },
      },
    });

    if (artesaoExiste) {
      throw new Error("Perfil de artesão já existe");
    }

    const artesao = artesaoRepository.create({
      nome_loja,
      bio,
      telefone,
      cidade,
      foto_perfil,
      user,
    });

    await artesaoRepository.save(artesao);

    return artesao;
  }
}
