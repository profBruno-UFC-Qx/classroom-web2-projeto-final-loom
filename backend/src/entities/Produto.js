const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Produto",
    tableName: "produtos",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        categoria_id: {
            type: "int",
            nullable: true, 
        },
        nome: {
            type: "varchar",
        },
        descricao: {
            type: "text",
            nullable: true,
        },
        sku: {
            type: "varchar",
            unique: true,
        },
        preco_custo: {
            type: "real",
            nullable: true,
        },
        preco_venda: {
            type: "real",
        },
        estoque_atual: {
            type: "int",
        },
        imagem_capa: {
            type: "varchar",
            nullable: true,
        },
        ativo: {
            type: "boolean",
            default: true,
        },
    },
});