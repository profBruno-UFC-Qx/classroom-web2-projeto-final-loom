import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";
import { User } from "../entities/User";
import { CreateArtesaoService } from "../services/CreateArtesaoService";
import { ListArtesoesService } from "../services/ListArtesoesService";
import { ListProdutosPorArtesaoService } from "../services/ListProdutosPorArtesaoService";

export class ArtesaoController {
  async create(request: Request, response: Response) {
    try {
      const userId = request.user.id;
      const { nome_loja, bio, telefone, cidade, foto_perfil } = request.body;

      if (!nome_loja) {
        return response.status(400).json({
          error: "nome_loja é obrigatório",
        });
      }

      const createArtesaoService = new CreateArtesaoService();

      const artesao = await createArtesaoService.execute({
        userId,
        nome_loja,
        bio,
        telefone,
        cidade,
        foto_perfil,
      });

      // ✅ segurança: se vier user junto, remove senha
      if ((artesao as any).user?.senha) {
        delete (artesao as any).user.senha;
      }

      return response.status(201).json(artesao);
    } catch (error: any) {
      return response.status(400).json({
        error: error.message,
      });
    }
  }

  async me(request: Request, response: Response) {
    const userId = request.user.id;

    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const artesao = await artesaoRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: ["user"],
    });

    if (!artesao) {
      return response.status(404).json({
        error: "Perfil de artesão não encontrado",
      });
    }

    // ✅ segurança: remove senha
    if ((artesao as any).user?.senha) {
      delete (artesao as any).user.senha;
    }

    return response.json(artesao);
  }

  async update(request: Request, response: Response) {
    const userId = request.user.id;
    const { nome_loja, bio, telefone, cidade, foto_perfil } = request.body;

    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const artesao = await artesaoRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: ["user"],
    });

    if (!artesao) {
      return response.status(404).json({
        error: "Perfil de artesão não encontrado",
      });
    }

    artesao.nome_loja = nome_loja ?? artesao.nome_loja;
    artesao.bio = bio ?? artesao.bio;
    artesao.telefone = telefone ?? artesao.telefone;
    artesao.cidade = cidade ?? artesao.cidade;
    artesao.foto_perfil = foto_perfil ?? artesao.foto_perfil;

    await artesaoRepository.save(artesao);

    // ✅ segurança: remove senha
    if ((artesao as any).user?.senha) {
      delete (artesao as any).user.senha;
    }

    return response.json(artesao);
  }

  async index(request: Request, response: Response) {
    const { page, limit, cidade, nome_loja } = request.query;

    const service = new ListArtesoesService();

    const artesoes = await service.execute({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      cidade: cidade as string,
      nome_loja: nome_loja as string,
    });

    return response.json(artesoes);
  }

  async produtos(request: Request, response: Response) {
    const { id } = request.params;
    const { page, limit } = request.query;

    const service = new ListProdutosPorArtesaoService();

    const produtos = await service.execute({
      artesao_id: Number(id),
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    return response.json(produtos);
  }

  // ✅ NOVO: SHOW artesão por id
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const artesaoRepository = AppDataSource.getRepository(Artesao);

    const artesao = await artesaoRepository.findOne({
      where: { id: Number(id) },
      relations: ["user"],
    });

    if (!artesao) {
      return response.status(404).json({
        error: "Artesão não encontrado",
      });
    }

    // ✅ segurança: remove senha
    if ((artesao as any).user?.senha) {
      delete (artesao as any).user.senha;
    }

    return response.json(artesao);
  }

  // ✅ NOVO: DELETE meu perfil de artesão
  async deleteMe(request: Request, response: Response) {
    try {
      const userId = request.user.id;

      const userRepository = AppDataSource.getRepository(User);
      const artesaoRepository = AppDataSource.getRepository(Artesao);

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return response.status(404).json({ error: "Usuário não encontrado" });
      }

      if (user.tipo_usuario !== "ARTESAO") {
        return response.status(403).json({
          error: "Apenas usuários ARTESAO podem remover perfil de artesão",
        });
      }

      const artesao = await artesaoRepository.findOne({
        where: { user: { id: userId } },
      });

      if (!artesao) {
        return response.status(404).json({
          error: "Perfil de artesão não encontrado",
        });
      }

      await artesaoRepository.remove(artesao);

      return response.json({ message: "Perfil de artesão removido com sucesso" });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
