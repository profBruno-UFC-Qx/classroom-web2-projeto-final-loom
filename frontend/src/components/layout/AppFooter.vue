<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div>
      <strong>Loom</strong>
      <p>Celebrando o artesanato local e a cultura.</p>
    </div>

    <div>
      <strong>Loja</strong>
      <p>Produtos</p>
      <p>Artesãos</p>
      <p>Novidades</p>
    </div>

    <div>
      <strong>Ajuda</strong>
      <p>Contato</p>
      <p>FAQ</p>
      <p>Envios & Retornos</p>
    </div>

    <div>
      <strong>Siga-nos</strong>
      <p>FB · IG · PI</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 40px;
  background: #f8efe8;
  font-size: 14px;
}

.footer strong {
  display: block;
  margin-bottom: 8px;
}

.footer p {
  margin: 4px 0;
  color: #555;
}
</style>

