import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";
import { User } from "../entities/User";

interface IRequest {
  nome_negocio: string;
  descricao: string;
  telefone: string;
  cidade: string;
  user_id: number;
}

export class CreateArtesaoService {
  async execute({
    nome_negocio,
    descricao,
    telefone,
    cidade,
    user_id,
  }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.tipo_usuario !== "ARTESAO") {
      throw new Error("Apenas usuários ARTESAO podem criar perfil");
    }

    const artesaoJaExiste = await artesaoRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (artesaoJaExiste) {
      throw new Error("Perfil de artesão já existe");
    }

    const artesao = artesaoRepository.create({
      nome_negocio,
      descricao,
      telefone,
      cidade,
      user,
    });

    await artesaoRepository.save(artesao);

    return artesao;
  }
}
