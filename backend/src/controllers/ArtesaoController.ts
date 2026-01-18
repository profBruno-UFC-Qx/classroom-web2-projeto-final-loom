import { Request, Response } from "express";
import { CreateArtesaoService } from "../services/CreateArtesaoService";
import { AppDataSource } from "../database/data-source";
import { Artesao } from "../entities/Artesao";


export class ArtesaoController {
  async create(request: Request, response: Response) {
  const userId = request.user.id;
  const { nome_loja, bio, telefone, cidade, foto_perfil } = request.body;

  if (!nome_loja) {
    return response.status(400).json({
      error: "nome_loja é obrigatório",
    });
  }

  const artesaoRepository = AppDataSource.getRepository(Artesao);

  const artesaoExiste = await artesaoRepository.findOne({
    where: {
      user: { id: userId },
    },
  });

  if (artesaoExiste) {
    return response.status(400).json({
      error: "Perfil de artesão já existe",
    });
  }

  const artesao = artesaoRepository.create({
    nome_loja,
    bio,
    telefone,
    cidade,
    foto_perfil,
    user: { id: userId },
  });

  await artesaoRepository.save(artesao);

  return response.status(201).json(artesao);
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

  return response.json(artesao);
}

}
