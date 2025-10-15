[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iVa2Dd1Z)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=21098546)
# :checkered_flag: LOOM

Plataforma de e-commerce dedicada a conectar artesãos da região de Quixadá e do Sertão Central a consumidores de todo o Brasil. O projeto oferece uma vitrine digital para que os artesãos possam divulgar e vender seus produtos, superando barreiras geográficas e aumentando sua fonte de renda.

## :technologist: Membros da equipe

Amanda Silva de Oliveira - 555298 - Sistemas de informação  
Carlos Jeferson Jacinto da Silva - 552568 - Sistemas de informação  
Ruan da Silva Araujo - 542084 - Sistemas de informação

## :bulb: Objetivo Geral
Desenvolver uma solução web que fortaleça o artesanato local, oferecendo aos produtores uma ferramenta acessível para a comercialização de seus produtos, visando o aumento da sua visibilidade, a valorização da cultura regional e a geração de novas oportunidades de negócio.

## :eyes: Público-Alvo
Vendedores: Artesãos da região de Quixadá e do Sertão Central, que produzem manualmente itens de decoração, vestuário, acessórios, etc., e que buscam um canal de vendas online.

Compradores: Turistas, moradores locais e consumidores de outras regiões que valorizam produtos artesanais, únicos e com identidade cultural.

## :star2: Impacto Esperado
Espera-se que a plataforma gere um impacto econômico positivo para os artesãos, aumentando seu faturamento e autonomia financeira. Além disso, o projeto visa fortalecer a cultura local, preservando as técnicas artesanais e apresentando a riqueza da produção da região para um público mais amplo, incentivando o consumo consciente e a valorização do trabalho manual.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Administrador: Responsável pela gestão da plataforma, aprovação de cadastros de artesãos, moderação de conteúdo e curadoria dos produtos em destaque.

Artesão (Vendedor): Usuário verificado que pode criar sua loja virtual, cadastrar e gerenciar produtos, controlar estoque, processar pedidos e interagir com os clientes.

Cliente (Comprador): Usuário cadastrado que pode navegar, comprar produtos, avaliar suas compras, favoritar lojas e produtos, e gerenciar seu histórico de pedidos.

Visitante (Usuário não logado): Qualquer pessoa que acesse o site, com permissão para visualizar produtos e perfis de artesãos, mas sem a capacidade de comprar ou interagir diretamente.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Funcionalidades Acessíveis a Todos (Visitantes):

- Navegar pela galeria de produtos na página inicial.
- Buscar produtos por nome, categoria ou artesão.
- Visualizar a página de detalhes de um produto (fotos, descrição, preço, avaliações).
- Visualizar o perfil público de cada artesão (história, foto, todos os seus produtos).
- Realizar o cadastro para se tornar um Cliente.

Funcionalidades para Usuários Logados (Clientes):

- Adicionar produtos ao carrinho de compras.
- Finalizar a compra (checkout com seleção de endereço e método de pagamento).
- Acessar o histórico de pedidos.
- Escrever avaliações para produtos comprados.
- Salvar produtos e artesãos em uma lista de "Favoritos".

Funcionalidades Restritas (Artesãos):

- Gerenciar seu perfil público (descrição, foto, informações de contato).
- Cadastrar novos produtos (fotos, nome, descrição, preço, estoque).
- Editar ou remover produtos existentes.
- Visualizar e gerenciar os pedidos recebidos (confirmar, enviar, cancelar).
- Painel de controle com resumo de vendas e produtos mais vendidos.

## :spiral_calendar: Entidades ou tabelas do sistema

- Usuario: (ID, nome, email, senha, tipo_usuario)
- Artesao_Perfil: (ID, usuario_id, nome_loja, bio, foto_perfil)
- Produto: (ID, artesao_id, categoria_id, nome, descricao, preco, estoque)
- Categoria: (ID, nome)
- Pedido: (ID, cliente_id, data, status, valor_total)
- Item_Pedido: (ID, pedido_id, produto_id, quantidade, preco_unitario)
- Endereco: (ID, usuario_id, rua, numero, cidade, cep)
- Avaliacao: (ID, produto_id, cliente_id, nota, comentario, data)

