const express = require('express');
const router = express.Router();
const AppDataSource = require('../database/data-source');
const ProdutoSchema = require('../entities/Produto');

const produtoRepo = AppDataSource.getRepository(ProdutoSchema);

// LISTAR TUDO
router.get('/', async (req, res) => {
    try {
        const produtos = await produtoRepo.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRIAR PRODUTO (POST)
router.post('/', async (req, res) => {
    // Recebe os dados exatos da tabela
    const { nome, descricao, sku, preco_venda, estoque_atual } = req.body;

    const novoProduto = produtoRepo.create({
        nome,
        descricao,
        sku,
        preco_venda,
        estoque_atual,
        ativo: true
    });

    try {
        await produtoRepo.save(novoProduto);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ error: "Erro ao salvar (verifique se o SKU já existe)" });
    }
});

module.exports = router;